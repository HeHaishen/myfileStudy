<!--
 * @Description: 灾害风险实时监测
 * @Author: liuxin
 * @Date: 2021-11-01 15:42:26
 * @LastEditTime: 2021-11-03 13:52:14
 * @LastEditors: JiaJun Wu
-->
<template>
    <div class="disaster">
        <div class="public-head">
            {{ title }}
        </div>
        <div class="plan-contents-list">
            <div class="content-opation">
                <p class="form-p">
                    <label for="">名称</label>
                    <input type="text" v-model="sendForm.name" />
                </p>
                <p class="form-p" v-if="false">
                    <label for="">类型</label>
                    <select
                        type="text"
                        v-model="sendForm.type"
                        disabled="disabled"
                        v-if="typeList.length"
                    >
                        <option v-for="(i) in typeList" :key="i.dictKey">
                            {{ i.dictValue }}
                        </option>
                    </select>
                </p>
                <p class="form-p" v-if="false">
                    <label for="">等级</label>
                    <select
                        type="text"
                        v-model="sendForm.level"
                        @change="levelChange"
                        v-if="levelList.length"
                    >
                        <option v-for="(i) in levelList" :key="i.dictKey">
                            {{ i.dictValue }}
                        </option>
                    </select>
                </p>
                <p class="btn" @click="toSearch">查询</p>
                <p class="btn" @click="doClearn">清空</p>
            </div>
            <div class="content-table-list">
                <Clist
                    class="table-list"
                    :columns="columns"
                    :listData="listData"
                >
                    <template
                        slot="eventTypeName"
                        slot-scope="{ record }"
                    >
                        <div style="width: 100%; height: 100%; display: block">
                            <p
                                style="width: 100%"
                                v-for="(i, k) in record.eventTypeName"
                                :key="i"
                            >
                                {{
                                    `${typeObj[i]}${
                                        k === record.eventTypeName.length - 1
                                            ? ""
                                            : "、"
                                    }`
                                }}
                            </p>
                        </div>
                    </template>
                    <template slot="operation" slot-scope="{ record }">
                        <div class="operation-divs">
                            <p class="btn-p" @click="showDetail(record)">
                                查看
                            </p>
                            <p class="btn-p" @click="startPlans(record)">
                                {{
                                    cookiesPlanIds[record.sid]
                                        ? "下达指令"
                                        : "启动预案"
                                }}
                            </p>
                        </div>
                    </template>
                </Clist>
            </div>
            <div class="table-pages">
                <ChangePage
                    :total="total"
                    v-model="currentPage"
                    @changePages="changePages"
                />
            </div>
        </div>
        <StartPlan ref="startPlanModel" @doSure="startPlanDoSure" />
        <SendOrder ref="sendOrder" />
        <PlanDetail ref="planDetail" />
        <div class="angel lt"></div>
        <div class="angel rt"></div>
        <div class="angel lb"></div>
        <div class="angel rb"></div>
    </div>
</template>

<script>
// import Clist from "@/components/APicture/c-table.vue";
// import ChangePage from "@/components/APicture/changePage/index.vue";
// import { yjzhPreventionDangerFind } from "@/api/idsm/index";

import Cookies from "js-cookie";
import Clist from "@/components/APicture/c-table.vue";
import ChangePage from "@/components/APicture/changePage/index.vue";
import StartPlan from "./startPlan";
import SendOrder from "./sendOrder";
import PlanDetail from "@/views/emergencyOrganizationCommandWar/components/fixedIcon/planIcon/planDetail";
import {
  getPlansList,
  planListType,
} from "@/api/emergencyOrganizationCommandWar";
import { getIdsmApi } from "@/api/idsm/index";

export default {
    props: {
        /** 当前应急事件数据 */
        eventData: {
            type: Object,
            default: () => {},
        },
    },
    components: { Clist, ChangePage },
    data() {
        return {
            title: "灾害风险实时监测",
            columns: [
                { title: "序号", textIndex: "index", width: "8%" },
                { title: "预案名称", textIndex: "name", width: "32%" },
                { title: "事件类型", textIndex: "reportor", width: "15%" },
                { title: "编制部门", textIndex: "adder", width: "15%" },
                { title: "操作", textIndex: "operate", width: "30%" },
            ],
            listData: [],
            queryData: {},
            total: 0,
            currentPage: 1,
        };
    },
    watch: {},
    computed: {},
    created() {},
    mounted() {
        this.doQuery();
    },
    methods: {
        // 列表数据获取
        doQuery() {
            let body = {
                body: {
                    ...this.queryData,
                },
                page: this.currentPage,
                pageSize: 8,
            };
            yjzhPreventionDangerFind(body).then((res) => {
                if (res.success) {
                    if (res.body) {
                        res.body.map((v, i) => {
                            Object.assign(v, {
                                index: (this.currentPage - 1) * 8 + (i + 1),
                            });
                        });
                        this.listData = res.body;
                        this.total = parseInt(res.total);
                    } else {
                        this.listData = [];
                    }
                } else {
                    this.$MyMessage.error(res.message);
                }
            });
        },
        // 分页切换
        changePages(param) {
            this.currentPage = param.pages;
            this.doQuery();
        },
        toView(record) {
            console.log(record, "查看");
        },
    },
};
</script>
<style lang='less' scoped>
@import "../../../common.less";
.disaster {
    border: 2px solid #015ebd;
    width: 100%;
    height: 948px;
    position: relative;
    background-color: #001941;
}
// 表格样式
.list {
    max-height: calc(100% - 84px);
    overflow: auto;
    /deep/ .list-header {
        padding: 10px 16px;
        background: #0d2e63;
        div {
            font-size: 30px;
            color: #2295ff;
        }
    }
    /deep/ .list-body {
        height: auto !important;
        li {
            margin: 0;
            background: #092a5d;
            div {
                line-height: 42.5px;
                font-size: 30px;
                padding: 18px 16px;
                span {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            // 操作按钮样式
            .operate {
                border: 1px solid;
                padding: 0 14px;
                font-size: 22px;
                color: #fff;
                border-color: #10d378;
                background: #10b46777;
                & + .operate {
                    margin-left: 5px;
                    border-color: #103fda;
                    background: #0d36be67;
                }
            }
            &.double-columns {
                background: #012257;
            }
        }
    }
}
// 分页器样式
.pagination {
    text-align: center;
    margin-top: 30px;
    /deep/.c-page-all {
        .ant-pagination-prev {
            min-width: 55px;
            height: 55px;
            line-height: 55px;
            .ant-pagination-item-link {
                color: white;
                background-color: #013ba9;
                font-size: 22px;
            }
        }
        .ant-pagination-item {
            background: #0c2e6b;
            font-size: 22px;
            min-width: 55px;
            height: 55px;
            line-height: 55px;
            a {
                color: #ffffff;
            }
        }

        .ant-pagination-next {
            min-width: 55px;
            height: 55px;
            line-height: 55px;
            .ant-pagination-item-link {
                color: #ffffff;
                background-color: #013ba9;
                font-size: 22px;
            }
        }
        .ant-pagination-jump-next {
            font-size: 22px;
            color: #ffffff;
            .ant-pagination-item-link {
                .ant-pagination-item-container {
                    font-size: 22px;
                    color: #ffffff;
                    i {
                        font-size: 22px;
                        color: #ffffff;
                    }
                    span {
                        font-size: 22px;
                        color: #ffffff;
                    }
                }
            }
        }
        .ant-pagination-jump-prev {
            font-size: 22px;
            color: white;
            .ant-pagination-item-link {
                .ant-pagination-item-container {
                    font-size: 22px;
                    color: #ffffff;
                    i {
                        font-size: 22px;
                        color: #ffffff;
                    }
                    span {
                        font-size: 22px;
                        color: #ffffff;
                    }
                }
            }
        }

        .ant-pagination-jump-next-custom-icon {
            .ant-pagination-item-link {
                .ant-pagination-item-container {
                    .ant-pagination-item-ellipsis {
                        color: white;
                        font-size: 18px;
                    }
                }
            }
        }
    }
    /deep/ .ant-pagination-item-ellipsis {
        color: white;
        font-size: 18px;
    }
    /deep/ .ant-pagination-item-container i {
        font-size: 18px;
        color: #ffffff;
    }
    /deep/ .ant-pagination-item-container .ant-pagination-item-ellipsis {
        font-size: 18px;
        color: #ffffff;
    }
    /deep/
        .ant-pagination-jump-next
        .ant-pagination-item-container
        .ant-pagination-item-ellipsis,
    /deep/
        .ant-pagination-jump-prev
        .ant-pagination-item-container
        .ant-pagination-item-ellipsis {
        color: white;
        font-size: 18px;
    }
}
</style>
