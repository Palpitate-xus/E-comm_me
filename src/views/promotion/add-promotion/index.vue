<template>
  <div class="container">
    <Breadcrumb :items="['menu.promotion', 'menu.promotion.add']" />
    <a-spin :loading="loading" style="width: 100%">
      <a-card class="general-card">
        <template #title> 创建活动 </template>
        <a-form :model="form" :style="{ width: '600px', marginTop: '20px' }">
          <a-form-item
            field="name"
            label="活动名称"
            help="This is custom message"
            extra="This is extra text"
            :validate-status="status"
            feedback
          >
            <a-input v-model="form.name" placeholder="请输入活动名称" />
          </a-form-item>
          <a-form-item
            field="post"
            label="活动描述"
            help="请输入活动描述"
            extra="This is extra text"
            :validate-status="status"
            feedback
          >
            <a-input v-model="form.post" placeholder="请输入活动描述" />
          </a-form-item>
          <a-form-item
            field="post"
            label="活动开始时间"
            help="请输入活动描述"
            extra="This is extra text"
            :validate-status="status"
            feedback
          >
            <a-input v-model="form.post" placeholder="请输入活动描述" />
          </a-form-item>
          <a-form-item
            field="post"
            label="活动结束时间"
            help="请输入活动描述"
            extra="This is extra text"
            :validate-status="status"
            feedback
          >
            <a-input v-model="form.post" placeholder="请输入活动描述" />
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
      post: undefined,
      tags: ['tag1'],
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
