import Vue from 'vue';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import {
  required,
  digits,
  numeric,
  email,
  confirmed,
  is_not,
  length,
  min,
  max,
} from 'vee-validate/dist/rules';

extend('password', {
  validate(value) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,20}$/;

    if (regex.test(value)) {
      return true;
    }
      return '{_field_}는 영문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 20자의 비밀번호여야 합니다.'
  }
})

extend('min', {
  ...min,
  message: '{_field_}는(은) 최소 {length}자리여야 합니다.'
})

extend('max', {
  ...max,
  message: '{_field_}는(은) 최대 {length}자리여야 합니다.'
})

extend('length', {
  ...length,
  message: '{_field_}는(은) {length}자리여야 합니다.'
})

extend('required', {
  ...required,
  message: '{_field_}는(은) 반드시 입력해야 합니다.',
});

extend('required-select', {
  ...required,
  message: '{_field_}는(은) 반드시 선택해야 합니다.',
});

extend('numeric', {
  ...numeric,
  message: '{_field_}는(은) 숫자로만 구성되어야 합니다.',
});
extend('digits', {
  ...digits,
  message: '{_field_}는(은) 11자리 여야 합니다.',
});

extend('email', {
  ...email,
  message: '잘못 입력된 이메일 주소 입니다.',
});

extend('is_not', {
  ...is_not,
  message: '기존 내용과 수정 내용이 달라야 합니다.'
})

// provider 에 :rules="{ confirmed: 'provider name 명을 적어주면 된다'}"
extend('confirmed', {
  ...confirmed,
  message: '비밀번호와 비밀번호확인이 일치하지 않습니다.',
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
