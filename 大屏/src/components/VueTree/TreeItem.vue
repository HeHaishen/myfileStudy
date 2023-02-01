<template>
    <li
        class="tree-item"
        :class="{
            expand: isExpand,
            'no-child':
                !treeItemData.children || treeItemData.children.length === 0,
        }"
    >
        <div class="tree-content">
            <div
                class="expand-arrow"
                :style="{ top: checkable? '15px':'10px' }" 
                @click.stop="expandTree(treeItemData.expand)"
            ></div>
            <div 
            :class="['tree-label', checkedKeys.selects.includes(treeItemData.sid)?'select-label':'']" 
            @click.stop.prevent="onSelect(treeItemData)">
                <template v-if="checkable">
                    <input
                        type="checkbox"
                        @change.stop.prevent="onChange(treeItemData)"
                        v-model="treeItemData.checked"
                        class="checkbox"
                    />
                </template>
                <template v-if="!isExpand">
					<i class="el-icon-folder" style="margin: 0 10px 0 10px"></i>
                </template>
                <template v-if="isExpand">
					<i class="el-icon-folder-opened" style="margin: 0 10px 0 10px"></i>
                </template>
                {{ treeItemData.name }}
            </div>
        </div>
        <ul
            class="sub-tree"
            v-if="treeItemData.children && treeItemData.children.length > 0"
        >
            <!--TreeItem组件中调用TreeItem组件-->
            <TreeItem
                v-for="item in treeItemData.children"
                :treeItemData="item"
                :key="uuid()"
                :treeData="treeData"
                :checkable="checkable"
                :checkedKeys="checkedKeys"
            ></TreeItem>
        </ul>
    </li>
</template>

<script>
export default {
    name: "TreeItem",
    props: {
        treeItemData: {
            type: Object,
            default: ()=>{}
        },
        checkable: {
            type: Boolean,
            default: false,
        },
        treeData: {
            type: Array,
            default: ()=>[]
        },
        checkedKeys:{
            type: Object,
            default: ()=>{ return { selects:[] }  }
        }
    },
    data() {
        return {
            // 节点是否展开
            isExpand: this.treeItemData.expand || false,
            selectSid: ''
        };
    },
    methods: {
        // 展开/收缩
        expandTree(flag) {
            this.treeItemData.expand = !flag;
            this.isExpand = !flag;
        },
        // 创建一个唯一id
        uuid() {
            let str = Math.random().toString(32);
            str = str.substr(2);
            return str;
        },
        onChange(obj) {
            this.$nextTick(() => {
                obj.checked = !!obj.checked;
                if (obj.children) {
                    this.allSelect(obj.children, obj.checked);
                }
                this.judgeSelect(obj, obj.checked);
            });
        },
        onSelect(obj){
            if(!this.checkable && this.checkedKeys.selects[0] != obj.sid){
                this.checkedKeys.selects = [obj.sid];
            }
        },
        //勾选后它的子节点也勾选
        allSelect(obj, checked) {
            this.$nextTick(() => {
                for (let i in obj) {
                    obj[i].checked = checked;
                    if (obj[i].children) {
                        this.allSelect(obj[i].children, checked);
                    }
                }
            });
        },
        judgeSelect(obj, checked) {
            let route = this.findIndexArray(this.treeData, obj.sid);
            if (route.length <= 1) {
                return;
            }
            route.splice(route.length - 1, 1);
            if (checked) {
                let routeLength = route.length;
                for (let i = 0; i < routeLength; i++) {
                    this.setSelect(
                        this.treeData,
                        JSON.parse(JSON.stringify(route))
                    );
                }
            } else {
                this.setUnSelect(this.treeData, route);
            }
        },
        //子节点勾选时设置父类是否勾选
        setSelect(data, route) {
            let obj = data[route[0]];
            let flag = true;
            for (let i in obj.children) {
                if (!obj.children[i].checked) {
                    flag = false;
                    break;
                }
            }
            obj.checked = flag;
            route.splice(0, 1);
            if (route.length) {
                this.setSelect(obj.children, route);
            }
            return false;
        },
        //子节点取消勾选时设置父类不勾选
        setUnSelect(data, route) {
            let obj = data[route[0]];
            obj.checked = false;
            route.splice(0, 1);
            if (route.length) {
                this.setUnSelect(obj.children, route);
            }
            return false;
        },
        // 子节点查询父节点的路径
        findIndexArray(data, sid, indexArray = []) {
            let arr = Array.from(indexArray);
            for (let i = 0, len = data.length; i < len; i++) {
                // arr.push(data[i].pid)
                arr.push(i);
                if (data[i].sid === sid) {
                    return arr;
                }
                let children = data[i].children;
                if (children && children.length) {
                    let result = this.findIndexArray(children, sid, arr);
                    if (result) return result;
                }
                arr.pop();
            }
            return false;
        },
    },
};
</script>