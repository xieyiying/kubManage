<template>
    <div class="c-table">
        <el-table :data="tableObject.data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" stripe>
            <el-table-column type="selection" width="55"></el-table-column>   
            <el-table-column
              v-for="(col,index) in tableObject.column"
              :key="index"
              :prop="col.prop"
              :label="col.label"
              :width="col.width"
            >
                <template slot-scope="scope">
                    <img v-if="'image' in col && col['image'] == 'image'" :src="scope.row[col.prop]" alt="" style="width: 100%; height: 150px;">
                    <video v-else-if="'image' in col && col['image'] == 'video'" :src="scope.row[col.prop]"></video>
                    <span v-else v-html="scope.row[col.prop]"></span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
                <template slot-scope="scope">
                    <el-button
                      v-for="(button, index) in tableObject.buttons"
                      :key="index"
                      size="small"
                      @click="button.callback(scope.$index, scope.row)"
                      :type="button.type"
                    >
                        {{button.text}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        name: 'c-table',
        props: {
            tableObject: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                multipleSelection: ''
            }
        },
        methods: {
            // 批量选择删除项
            handleSelectionChange(multipSelect) {
                if(multipSelect.length > 0) {
                    let multipSelectIdArr = []
                    multipSelect.map( item => {
                        multipSelectIdArr.push(item.id)
                    })
                    this.multipleSelection = multipSelectIdArr.join(',')
                }
                this.$emit('selectionChange', this.multipleSelection)
                
            },
        },
        created() {

        }
    }
</script>
<style>

</style>
