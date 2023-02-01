<!--
 * @Description: 通讯录群组树形
 * @Version: 1.0
 * @Autor: JiaJun Wu
 * @Date: 2021-10-29 15:57:50
 * @LastEditors: JiaJun Wu
 * @LastEditTime: 2021-10-29 16:30:06
-->
<!-- 通讯录群组树形 -->
<template>
  <div class="tree_group">
    <a-tree
      :selectedKeys="selected"
      :loadData="onLoadData"
      :treeData="treeData"
      defaultExpandParent
      :expandedKeys="expanded"
      @expand="
        (expandedKeys) => {
          expanded = expandedKeys;
        }
      "
      @select="onNodeSelected"
    >
      <template slot="titleSlot" slot-scope="node">
        <span class="tree_title" :title="node.title">{{ node.title }}</span>
      </template>
    </a-tree>
  </div>
</template>

<script>
import { groupTreeWith } from "@/api/idsm/index";

export default {
  components: {},
  model: {
    event: "change",
    prop: "value",
  },
  props: {
    value: {
      type: Object,
    },
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val) {
          this.formData = val;
        }
      },
    },
  },
  data() {
    return {
      selected: [], // tree 选中节点集合
      expanded: [], // tree 展开节点集合
      treeData: [],
      nodes: [],
      /** 当前选择树数据 */
      formData: {},
    };
  },
  //创建完成 访问当前this实例
  created() {
    this.loadTreeRoot();
  },
  //挂载完成 访问DOM元素
  mounted() {},
  //方法集合
  methods: {
    loadTreeRoot() {
      groupTreeWith("-1")
        .then((result) => {
          if (result.success) {
            this.treeData = [];
            result.body.forEach((row) => {
              let node = {
                key: row.sid,
                ...row,
                title: row.groupName,
                isLeaf: row.isLeaf == 1,
                scopedSlots: { title: "titleSlot" },
                children: [],
              };
              this.treeData.push(node);
            });
            this.$nextTick(() => {
              this.treeData.forEach((row) => {
                this.nodes[row.sid] = row;
              });
            });
          } else {
            this.$message.error(result.message);
          }
        })
        .catch((error) => {
          this.loading = false;
          this.$message.error("系统错误");
        });
    },
    /** 加载数据 */
    onLoadData(node) {
      return new Promise((resolve) => {
        groupTreeWith(node.dataRef.sid).then((result) => {
          if (result.success) {
            result.body.forEach((row) => {
              row.key = row.sid;
              row.title = row.groupName;
              row.scopedSlots = { title: "titleSlot" };
              this.nodes[row.sid] = row;
            });
            node.dataRef.children = result.body;
            this.treeData = [...this.treeData];
          } else {
            this.$message.error(result.message);
          }
        });
        resolve();
      });
    },

    /**
     * 树节点选中事件
     */
    onNodeSelected(selectedKeys, { node }) {
      const _node = node.dataRef;
      if (this.selected.findIndex((e) => e == _node.sid) > -1) {
        this.formData = {};
        this.selected = [];
      } else {
        this.formData = _node;
        this.selected = [_node.sid];
      }

      this.$nextTick(() => {
        this.$emit("change", this.formData);
      });
    },
  },
};
</script>
<style lang='less'>
.tree_group {
  .tree_title {
    width: 100%;
    color: white;
  }

  .ant-tree {
    li {
      .ant-tree-switcher {
        color: white;
      }
      .ant-tree-node-content-wrapper {
        &:hover,
        &.ant-tree-node-selected {
          background-color: transparent;

          .tree_title {
            color: rgba(56, 140, 255, 0.5);
          }
        }
        &.ant-tree-node-selected {
          .tree_title {
            color: #388cff;
          }
        }
      }
    }
  }
}
</style>