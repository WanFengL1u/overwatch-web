<template>
  <div>
    <el-card class="!border-none" shadow="never">
      <el-row type="flex" justify="space-between">
        <el-select v-model="queryParams.hero_type" placeholder="请选择英雄类型" clearable @change="fetchData">
            <el-option
              v-for="type in heroTypes"
              :key="type.id"
              :label="type.name"
              :value="type.id"
            />
          </el-select>
      <el-button type="primary" @click="handleCreate">新增英雄</el-button>
      </el-row>
 
    </el-card>
    <el-card class="!border-none mt-4" shadow="never">
      <el-table :data="heroes" stripe border>
        <el-table-column prop="name" label="英雄名称"></el-table-column>
        <el-table-column prop="hero_type" label="英雄类型">
          <template #default="scope">
            <span>{{ heroTypes.find(item => item.id === scope.row.hero_type)?.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="life" label="生命值"></el-table-column>
        <el-table-column prop="shield" label="护盾值"></el-table-column>
        <el-table-column prop="armour" label="护甲值"></el-table-column>
        <el-table-column label="操作" width="150">
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
      <div class="mt-4 flex justify-end">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="goChangePage"
        />
      </div>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="formType === 'create' ? '新增英雄' : '编辑英雄'"
      :close-on-click-modal="false"
      @close="handleDialogClose"
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="英雄名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="英雄类型" prop="hero_type">
          <el-select v-model="form.hero_type" placeholder="请选择英雄类型">
            <el-option
              v-for="type in heroTypes"
              :key="type.id"
              :label="type.name"
              :value="type.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="生命值" prop="life">
          <el-input-number v-model="form.life" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="护盾值" prop="shield">
          <el-input-number v-model="form.shield" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="护甲值" prop="armour">
          <el-input-number v-model="form.armour" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import {
  heroLists,
  heroAdd,
  heroEdit,
  heroDelete,
  heroDetail,
} from "@/api/hero";
import { heroTypeLists } from "@/api/heroType";

// 状态管理
const heroes = ref([]);
const heroTypes = ref([]);
const dialogVisible = ref(false);
const form = reactive({
  id: 0,
  name: "",
  hero_type: "",
  life: 0,
  shield: 0,
  armour: 0,
});
const formType = ref("create"); // create/update
const queryParams = ref({
  page: 1,
  pageSize: 10,
  hero_type:''
});
const total = ref(0);
// 表单引用
const formRef = ref(null);

// 表单验证规则
const rules = reactive({
  name: [{ required: true, message: "请输入英雄名称", trigger: "blur" }],
  hero_type: [{ required: true, message: "请选择英雄类型", trigger: "change" }],
  life: [{ required: true, message: "请输入生命值", trigger: "blur" }],
  shield: [{ required: true, message: "请输入护盾值", trigger: "blur" }],
  armour: [{ required: true, message: "请输入护甲值", trigger: "blur" }],
});

// 获取英雄数据
const fetchData = async () => {
  const res = await heroLists(queryParams.value);
  heroes.value = res.list;
  total.value = res.total;
};

// 获取英雄类型数据
const fetchHeroTypes = async () => {
  const res = await heroTypeLists();
  heroTypes.value = res;
};

// 新增英雄
const handleCreate = () => {
  formType.value = "create";
  resetForm();
  dialogVisible.value = true;
};

// 编辑英雄
const handleEdit = async (row) => {
  try {
    const res = await heroDetail({ id: row.id });
    formType.value = "update";
    Object.assign(form, res);
    dialogVisible.value = true;
  } catch (error) {
    ElMessage.error("获取英雄详情失败");
  }
};
const goChangePage = (page) => {
  queryParams.value.page = page;
  fetchData();
};
// 删除英雄
const handleDelete = async (id) => {
  try {
    await heroDelete({ id });
    ElMessage.success("删除成功");
    fetchData();
  } catch (error) {
    ElMessage.error("删除失败");
  }
};

// 表单提交
const handleSubmit = async () => {
  try {
    await formRef.value.validate();

    if (formType.value === "create") {
      await heroAdd(form);
      ElMessage.success("新增成功");
    } else {
      await heroEdit(form);
      ElMessage.success("修改成功");
    }

    dialogVisible.value = false;
    fetchData();
  } catch (error) {
    if (!error) {
      // 验证失败
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
  form.hero_type = "";
  form.life = 0;
  form.shield = 0;
  form.armour = 0;
};

// 弹窗关闭时重置表单
const handleDialogClose = () => {
  resetForm();
  formRef.value?.resetFields();
};

// 生命周期钩子：初始化数据
onMounted(() => {
  fetchData();
  fetchHeroTypes();
});
</script>