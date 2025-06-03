<template>
  <div class="hero-type-container">
    <!-- 增删改查操作区 -->
    <div class="action-section">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-button type="primary" @click="handleCreate">新增类型</el-button>
        </el-col>
      </el-row>

      <!-- 表格与操作 -->
      <el-table
        :data="heroTypes"
        stripe
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column prop="name" label="类型名称"></el-table-column>
        <el-table-column prop="code" label="类型代码"></el-table-column>
        <el-table-column prop="total" label="英雄数量"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新增/编辑弹窗 -->
      <el-dialog
        v-model="dialogVisible"
        title="英雄类型管理"
        :close-on-click-modal="false"
        @close="handleDialogClose"
      >
        <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
          <el-form-item label="类型名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="类型代码" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="英雄数量" prop="total">
            <el-input-number v-model="form.total" :min="0"></el-input-number>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import {
  heroTypeLists,
  heroTypeAdd,
  heroTypeEdit,
  heroTypeDelete,
  heroTypeDetail,
} from "@/api/heroType";

// 状态管理
const heroTypes = ref([]);
const dialogVisible = ref(false);
const form = reactive({
  id: 0,
  name: "",
  code: "",
  total: 0,
});
const formType = ref("create"); // create/update

// 表单引用
const formRef = ref(null);

// 表单验证规则
const rules = reactive({
  name: [{ required: true, message: "请输入类型名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入类型代码", trigger: "blur" }],
  total: [{ required: true, message: "请输入英雄数量", trigger: "blur" }],
});

// 获取数据
const fetchData = async () => {
  const res = await heroTypeLists();
  heroTypes.value = res;
};

// 新增类型
const handleCreate = () => {
  formType.value = "create";
  resetForm();
  dialogVisible.value = true;
};

// 编辑类型
const handleEdit = async (row) => {
  try {
    // 使用详情接口获取最新数据
    const res = await heroTypeDetail({ id: row.id });
    formType.value = "update";
    form.id = res.id;
    form.name = res.name;
    form.code = res.code;
    form.total = res.total;
    dialogVisible.value = true;
  } catch (error) {
    ElMessage.error("获取类型详情失败");
  }
};

// 删除类型
const handleDelete = async (id) => {
  await heroTypeDelete({ id });
  ElMessage.success("删除成功");
  fetchData();
};

// 表单提交
const handleSubmit = async () => {
  try {
    // 修正：正确调用表单验证方法
    if (!formRef.value) return;

    await formRef.value.validate((valid) => {
      if (!valid) {
        throw new Error("表单验证失败");
      }
    });

    let res;
    if (formType.value === "create") {
      res = await heroTypeAdd(form);
    } else {
      res = await heroTypeEdit(form);
    }
    ElMessage.success(`${formType.value === "create" ? "新增" : "修改"}成功`);
    dialogVisible.value = false;
    fetchData();
  } catch (error) {
    // 表单验证失败时的错误处理
    if (error.message === "表单验证失败") {
      ElMessage.warning("请检查表单填写项");
    } else {
      ElMessage.error("操作失败");
    }
  }
};

// 重置表单
const resetForm = () => {
  form.id = 0;
  form.name = "";
  form.code = "";
};

// 弹窗关闭时重置表单
const handleDialogClose = () => {
  resetForm();
  formRef.value?.resetFields();
};
// 生命周期钩子：初始化数据
onMounted(() => {
  fetchData();
});
</script>
  
  <style scoped>
.hero-type-container {
  padding: 20px;
  background-color: #fff;
}

.stat-card-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  flex: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 18px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-title {
  font-size: 1.2em;
  font-weight: 500;
  color: #333;
}

.card-count {
  font-size: 1.8em;
  font-weight: 700;
  color: #409eff;
}

.card-subtitle {
  font-size: 0.9em;
  color: #666;
}

.action-section {
  width: 100%;
}

.el-table {
  margin-top: 15px;
}

.el-table__row:hover {
  cursor: pointer;
}
</style>
  