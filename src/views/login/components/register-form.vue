<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">注册</div>
    <div class="login-form-sub-title">
      register to online mall management system
    </div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="registerForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="name"
        :rules="[{ required: true, message: '名称不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          placeholder="名称"
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="address"
        :rules="[{ required: true, message: '地址不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          placeholder="地址"
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="username"
        :rules="[{ required: true, message: $t('login.form.userName.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          :placeholder="$t('login.form.userName.placeholder')"
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          :placeholder="$t('login.form.password.placeholder')"
          allow-clear
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button
          type="primary"
          html-type="submit"
          long
          :loading="loading"
          @click="handleRegister"
        >
          {{ $t('login.form.register') }}
        </a-button>
        <a-button type="text" long class="login-form-register-btn">
          {{ $t('login.form.login') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { Message } from '@arco-design/web-vue';
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store';
import useLoading from '@/hooks/loading';
import { LoginData } from '@/api/user';

export default defineComponent({
  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const errorMessage = ref('');
    const { loading, setLoading } = useLoading();
    const userStore = useUserStore();
    const userInfo = reactive({
      username: '',
      password: '',
    });
    const handleRegister = async ({
      errors,
      values,
    }: {
      errors: Record<string, ValidatedError> | undefined;
      values: LoginData;
    }) => {
      if (!errors) {
        setLoading(true);
        try {
          await axios.post('http://127.0.0.1:8000/api/users/login', {
            username: '20002522',
            password: '20002522',
            user_type: 'customer',
          });
          const { redirect, ...othersQuery } = router.currentRoute.value.query;
          router.push({
            name: (redirect as string) || 'workplace',
            query: {
              ...othersQuery,
            },
          });
          Message.success(t('login.form.login.success'));
        } catch (err) {
          errorMessage.value = (err as Error).message;
        } finally {
          setLoading(false);
        }
      }
    };
    const handleSubmit = async ({
      errors,
      values,
    }: {
      errors: Record<string, ValidatedError> | undefined;
      values: LoginData;
    }) => {
      if (!errors) {
        setLoading(true);
        try {
          await userStore.login(values);
          const { redirect, ...othersQuery } = router.currentRoute.value.query;
          router.push({
            name: (redirect as string) || 'workplace',
            query: {
              ...othersQuery,
            },
          });
          Message.success(t('login.form.login.success'));
        } catch (err) {
          errorMessage.value = (err as Error).message;
        } finally {
          setLoading(false);
        }
      }
    };
    return {
      loading,
      userInfo,
      errorMessage,
      handleSubmit,
      handleRegister,
    };
  },
});
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
}
</style>
