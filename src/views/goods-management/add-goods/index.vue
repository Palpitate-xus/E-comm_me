<template>
  <div class="container">
    <Breadcrumb :items="['menu.goods', 'menu.goods.add']" />
    <a-spin :loading="loading" style="width: 100%">
      <a-card class="general-card">
        <template #title> 创建商品 </template>
        <a-form :model="form" :style="{ width: '600px', marginTop: '20px' }">
          <a-form-item
            field="name"
            label="商品名称"
            help="商品的产品名称"
            feedback
          >
            <a-input v-model="form.name" placeholder="请输入商品名称" />
          </a-form-item>
          <a-form-item
            field="description"
            label="商品描述"
            help="有助于顾客选购商品的信息"
            feedback
          >
            <a-input v-model="form.description" placeholder="请输入商品描述" />
          </a-form-item>
          <a-form-item
            field="price"
            label="商品价格"
            help="商品的价格"
            feedback
          >
            <a-input v-model="form.price" placeholder="请输入商品价格" />
          </a-form-item>
          <a-form-item
            field="stock"
            label="商品库存"
            help="商品此时的库存数量"
            feedback
          >
            <a-input v-model="form.stock" placeholder="请输入商品库存" />
          </a-form-item>
          <a-form-item
            field="pic"
            label="商品图片"
            help="请上传商品图片"
            feedback
          >
            <a-upload draggable accept=".jpg,.png,.jpeg" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary">提交</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import useLoading from '../../../hooks/loading';
import {
  submitChannelForm,
  BaseInfoModel,
  ChannelInfoModel,
  UnitChannelModel,
} from '../../../api/form';
// import BaseInfo from './base-info.vue';
// import ChannelInfo from './channel-info.vue';
// import Success from './success.vue';

export default defineComponent({
  // components: {
  //   BaseInfo,
  //   ChannelInfo,
  //   Success,
  // },
  setup() {
    const { loading, setLoading } = useLoading(false);
    const step = ref(1);
    const status = ref('success');
    const submitModel = ref<UnitChannelModel>({} as UnitChannelModel);
    const form = reactive({
      name: '',
      description: '',
      stock: '',
      price: '',
      url: '',
    });
    const submitForm = async () => {
      setLoading(true);
      try {
        await submitChannelForm(submitModel.value); // The moack api default success
        step.value = 3;
        submitModel.value = {} as UnitChannelModel; // init
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };
    const changeStep = (
      direction: string | number,
      model: BaseInfoModel | ChannelInfoModel
    ) => {
      if (typeof direction === 'number') {
        step.value = direction;
        return;
      }

      if (direction === 'forward' || direction === 'submit') {
        submitModel.value = {
          ...submitModel.value,
          ...model,
        };
        if (direction === 'submit') {
          submitForm();
          return;
        }
        step.value += 1;
      } else if (direction === 'backward') {
        step.value -= 1;
      }
    };
    return {
      loading,
      step,
      form,
      status,
      changeStep,
    };
  },
});
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;
  background-color: var(--color-bg-2);
  :deep(.arco-form) {
    .arco-form-item {
      &:last-child {
        margin-top: 20px;
      }
    }
  }
}

.steps {
  margin-bottom: 76px;
}
</style>
