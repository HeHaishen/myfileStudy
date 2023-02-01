<template>
    <ul class="vue-tree">
        <TreeItem
            v-for="(item, index) in treeData"
            :key="index"
            :treeData="treeData"
            :checkable="checkable"
            :treeItemData="item"
            :checkedKeys="checkedKeys"
        ></TreeItem>
    </ul>
</template>

<script>
import TreeItem from "./TreeItem";
export default {
    name: "VueTreeMenu",
    components: {
        TreeItem,
    },
    props: {
        // 树形控件数据
        treeData: {
            type: Array,
            default() {
                return [];
            },
        },
        checkable: {
            type: Boolean,
            default: false,
        },
        checkedKeys:{
            type: Object,
            default:()=>{ return { selects:[] } }
        }
    },
};
</script>

<style lang="less">
@import "./common.less";
.vue-tree {
    list-style: none;
    padding: 0;
    margin: 0;
    .checkbox {
        transform: translateY(3px);
    }
    .tree-item {
        position: relative;
        cursor: pointer;
        transition: background-color 0.2s;
        // .tree-item::after{
        // 	position: absolute;
        // 	content: '';
        // 	left: 0;
        // 	top: -50px;
        // 	border-left: 2px dashed #FFFFFF;
        // 	height: 100%;
        // }

        .tree-content {
            position: relative;
            padding-left: 14px;
            &:hover {
                // background-color: #f0f7ff;
            }
            // &::before{
            // 	position: absolute;
            // 	content: '';
            // 	left: 30px;
            // 	top: 25px;
            // 	border-top: 2px dashed #FFFFFF;
            // 	height: 1px;
            // 	width: 35px;
            // }
        }
        .expand-arrow {
            position: absolute;
            top: 5px;
            left: 7px;
            width: 14px;
            height: 14px;
            cursor: pointer;
            &::after {
                position: absolute;
                top: 0px;
                left: 0px;
                display: block;
                content: " ";
                border-width: 8px;
                border-style: solid;
                border-color: transparent;
                border-left-color: rgba(0, 233, 234, 1);
                transition: all 0.2s;
            }
        }
        &.expand {
            position: relative;
            & > .tree-content {
                // background-color: #f0f7ff;
                & > .expand-arrow {
                    &::after {
                        transform: rotate(90deg);
                    }
                }
            }
        }
        .tree-label {
            // font-size: 15px;
            // font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            padding: 5px 0;
            margin-left: 10px;
        }
        .select-label{
            background-color: rgba(0, 233, 234, 0.3);
        }
        .sub-tree {
            display: none;
            list-style: none;
            padding: 0 0 0 14px;
            margin: 0;
        }
        &.expand > .sub-tree {
            display: block;
        }
        &.no-child {
            & > .tree-content {
                /*padding-left: 0;*/
                & > .expand-arrow {
                    display: none;
                }
            }
        }
    }
}
</style>