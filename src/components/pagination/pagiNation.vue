<template>
    <div class="pagination">
        <button @click="$emit('getPageMsg',pageNo-1)" :disabled="pageNo === 1" :class="{active:pageNo==1}">上一页</button>
        <button v-show="startAndEnd.start>1" @click="$emit('getPageMsg',1)">1</button>

        <button v-show="startAndEnd.start>2">...</button>
        <button 
            v-for="(page,index) in startAndEnd.end" 
            :key="index" 
            v-show="page>=startAndEnd.start && page<=startAndEnd.end" 
            @click="$emit('getPageMsg',page)"
            :class="{active:pageNo==page}">{{ page }}
        </button>
        <button v-show="startAndEnd.end<totalPage-1">...</button>

        <button v-show="startAndEnd.end<totalPage" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
        <button @click="$emit('getPageMsg',pageNo+1)" :disabled="pageNo === totalPage">下一页</button>
        <button style="margin-left:30px">共{{ total }}条</button>
    </div>
</template>
  
<script>
export default {
    name: "pagiNation",
    props: ["total", "pageSize", "pageNo", "continues"],
    computed: {
        //分页器一共多少页【总条数/每页展示条数】
        totalPage() {
            //向上取整数
            return Math.ceil(this.total / this.continues);
        },
        
        //底下的代码是整个分页器最重要的地方[算出连续五个数字、开头、结尾]
        startAndEnd() {
            //算出连续页码:开始与结束这两个数字
            let start = 0,
                end = 0;
            const { totalPage, continues, pageNo } = this;
            //特殊情况:总共页数小于连续页码数
            if (totalPage < continues) {
                start = 1;
                end = totalPage;
            } else {
                //正常情况：分页器总页数大于连续页码数
                start = pageNo - parseInt(continues / 2);
                end = pageNo + parseInt(continues / 2);
                //约束start|end在合理范围之内
                //约束头部
                if (start < 1) {
                    start = 1;
                    end = continues;
                }
                //约束尾部
                if (end > totalPage) {
                    end = totalPage;
                    start = totalPage - continues + 1;
                }
            }
            return { start, end };
        },
    },
};
</script>
  
<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
.active{
    background-color: skyblue;
}
</style>