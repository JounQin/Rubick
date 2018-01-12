<template lang="pug">
main
  form.wider(@submit.prevent="register")
    div {{ $t('enterprise_registration') }}
    div(:class="$style.note")
      div {{ $t('note') + $t('colon') }}
      ol
        li(v-for="i of 3") {{ $t('register_tips_' + i) }}
    rb-input(v-for="type of types"
             :class="{invalid: $v[type].$error}"
             :label="$t(snakeCase(type))"
             :captcha="Captchas[type]"
             :captchaDisabled="type === 'verificationCode' && ($v.mobile.$invalid || $v.imageCaptcha.$invalid)"
             :captchaData="type === 'verificationCode' ? { captcha: imageCaptcha, mobile } : null"
             :selections="Selections[type]"
             displayField="display",
             valueField="value"
             :maxNum="type === 'applyingServices' ? -1 : 1"
             :key="type"
             v-model="_self[type]"
             :type="type.indexOf('password') !== -1 ? 'password' : 'text'"
             @input="$v[type].$touch()")
      template(v-if="$v[type].$dirty && !$v[type].required", slot="error") {{ $t('required') }}
    rb-btn.btn-block(type="submit", :disabled="$v.$invalid") {{ $t('register') }}
  .tips.text-center
    router-link(to="/login") {{ $t('login_tips') }}
</template>
<script lang="ts">
import { snakeCase } from 'lodash'
import { Component, Vue, Watch } from 'vue-property-decorator'

import RbInput from 'components/rb-input/RbInput.vue'

const Captchas: {
  [key: string]: string
} = {
  imageCaptcha: 'image',
  verificationCode: 'code',
}

const SelectionsType = {
  industry: [
    'education',
    'e-commerce',
    'mobile-medical',
    'entertainment',
    'locale',
    'social-network',
    'estate-service',
    'ads-marketing',
    'mobile-internet',
    'travel',
    'game',
    'tool-software',
    'internet-finance',
    'enterprise-service',
    'others',
  ],
  trailMode: ['professional', 'enterprise', 'data-center'],
  applyingServices: [
    'cloud-strategy-consultancy',
    'cloud-solution-architect',
    'application-migrating-deployment',
    'support-operational-optimization',
    'professional-training',
  ],
  informedWay: [
    'social-site',
    'offline-activity',
    'media-reports',
    'forums',
    'search-engine',
    'recommended',
    'others',
  ],
}

@Component({
  components: {
    RbInput,
  },
  translator: {
    zh: {
      enterprise_registration: '企业注册',
      realyname: '真实姓名',
      company: '公司名称',
      city: '所在城市',
      industry: '公司行业',
      position: '职位',
      trail_mode: '希望试用的模式',
      applying_services: '希望申请的服务',
      informed_way: '获知途径',
      register_tips_1: '我们不提供 VPN 服务("翻墙")，请遵守国家法律法规',
      register_tips_2: '请填写您企业的真实信息，以便尽快通过审核并开启试用',
      register_tips_3: '所有字段皆为必填',
      enterprise: '企业版',
      data_center: '数据中心版',
      professional: '专业版',
      education: '教育',
      e_commerce: '电子商务',
      mobile_medical: '移动医疗',
      entertainment: '文化娱乐',
      local_life: '本地生活',
      social_network: '社交网络',
      estate_service: '房产服务',
      ads_marketing: '广告营销',
      mobile_internet: '移动互联网',
      travel: '旅游',
      game: '游戏',
      tool_software: '工具软件',
      internet_finance: '互联网金融',
      enterprise_service: '企业服务',
      others: '其它',
      cloud_strategy_consultancy: '云战略咨询规划',
      cloud_solution_architect: '云架构方案设计',
      application_migrating_deployment: '应用迁移部署',
      support_operational_optimization: '运维优化支撑',
      professional_training: '专业培训认证',
      social_site: '微信微博',
      offline_activity: '线下活动',
      media_reports: '媒体报道',
      forums: '社区论坛',
      search_engine: '搜索引擎',
      recommended: '朋友推荐',
    },
    en: {
      enterprise_registration: 'Enterprise Registration',
      realyname: 'Your Full Name',
      company: 'Company Name',
      city: 'City',
      industry: 'Industry',
      position: 'Your Position',
      trail_mode: 'Trail Mode',
      applying_services: 'Expected Services to Apply',
      informed_way: 'How do you get to know about us?',
      register_tips_1:
        "We don't provide VPN services. Please comply with national laws and regulations",
      register_tips_2:
        'Fill out your genuine business details so that your registration can be reviewed and approved as soon as possible',
      register_tips_3: 'All fields are mandatory',
      enterprise: 'Enterprise',
      data_center: 'Data Center',
      professional: 'Professional',
      education: 'Education',
      e_commerce: 'E-Commerce',
      mobile_medical: 'Mobile Medical',
      entertainment: 'Entertainment',
      local_life: 'Locale Life',
      social_network: 'Social Network',
      estate_service: 'Estate Service',
      ads_marketing: 'ADs Marketing',
      mobile_internet: 'Mobile Internet',
      travel: 'Travel',
      game: 'Video Games',
      tool_software: 'Tool Software',
      internet_finance: 'Internet Finance',
      enterprise_service: 'Enterprise Service',
      others: 'Others',
      cloud_strategy_consultancy: 'Cloud Strategy Consultancy',
      cloud_solution_architect: 'Cloud Solution architect',
      application_migrating_deployment: 'Application Migration Deployment',
      support_operational_optimization: 'Operation Optimization Support',
      professional_training: 'Professional Training',
      social_site: 'Social Media',
      offline_activity: 'Offline Activities',
      media_reports: 'Media',
      forums: 'Forums',
      search_engine: 'Search Engine',
      recommended: 'Friend Recommendation',
    },
  },
  validator: {
    account: {
      required: true,
    },
    email: {
      required: true,
    },
    password: {
      required: true,
    },
    confirmPassword: {
      required: true,
    },
    mobile: {
      mobile: true,
    },
    imageCaptcha: {
      length: 4,
    },
    verificationCode: {
      length: 4,
    },
    realyname: {
      required: true,
    },
    company: {
      required: true,
    },
    city: {
      required: true,
    },
    industry: {
      required: true,
    },
    position: {
      required: true,
    },
    trailMode: {
      required: true,
    },
    applyingServices: {
      required: true,
    },
    informedWay: {
      required: true,
    },
  },
})
export default class Register extends Vue {
  types = [
    'account',
    'email',
    'password',
    'confirmPassword',
    'mobile',
    'imageCaptcha',
    'verificationCode',
    'realyname',
    'company',
    'city',
    'industry',
    'position',
    'trailMode',
    'applyingServices',
    'informedWay',
  ]

  account: string = null
  email: string = null
  password: string = null
  confirmPassword: string = null
  mobile: string = null
  imageCaptcha: string = null
  verificationCode: string = null
  realyname: string = null
  company: string = null
  city: string = null
  industry: string = null
  position: string = null
  trailMode: string[] = null
  applyingServices: string[] = null
  informedWay: string = null

  snakeCase = snakeCase

  Captchas = Captchas

  Selections: { [key: string]: Array<{ display: string; value: string }> } = {}

  @Watch('$t.locale', { immediate: true })
  localeChange() {
    for (const [key, values] of Object.entries(SelectionsType)) {
      let selections = this.Selections[key]

      if (!selections) {
        selections = this.Selections[key] = []
      }

      values.forEach((value, index) => {
        const display = this.$t(snakeCase(value))
        if (selections[index]) {
          selections[index].display = display
        } else {
          selections[index] = {
            display,
            value,
          }
        }
      })
    }
  }

  register() {}
}
</script>
<style lang="scss" module>
.note {
  display: flex;
  color: $tips-color;
  font-size: 12px;
  margin-bottom: 20px;

  > ol {
    flex: 1;
    margin-bottom: 0;
    padding-left: 20px;
  }
}
</style>
