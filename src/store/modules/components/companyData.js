/**
 * Created by Administrator on 2017/9/4.
 */
import * as MUTATIONS from '../../mutations';

const state = {
  companyListByIndustryCode: [],
  companyTypeListPub: [
    {
      value: '31',
      label: '有限责任公司'
    }, {
      value: '32',
      label: '股份有限公司'
    }, {
      value: '33',
      label: '国有独资公司'
    }, {
      value: '34',
      label: '个人独资企业'
    }, {
      value: '35',
      label: '合伙企业'
    }, {
      value: '36',
      label: '个体工商户'
    }, {
      value: '37',
      label: '外商投资企业'
    }, {
      value: '38',
      label: '私营企业'
    },

  ],
  industryCodeListPub: [
    {
      value: "201",
      label: '农业'
    },
    {
      value: "202",
      label: '林业'
    },
    {
      value: "203",
      label: '畜牧业'
    },
    {
      value: "204",
      label: '渔业'
    },
    {
      value: "205",
      label: '采矿业'
    },
    {
      value: "206",
      label: '制造业'
    },
    {
      value: "207",
      label: '水电热燃供应'
    },
    {
      value: "208",
      label: '建筑业'
    },
    {
      value: "209",
      label: '批发和零售业'
    },
    {
      value: "210",
      label: '交通运输、仓储和邮政业'
    },
    {
      value: "211",
      label: '住宿和餐饮业'
    },
    {
      value: "212",
      label: '信息软件'
    },
    {
      value: "213",
      label: '金融业'
    },
    {
      value: "214",
      label: '房地产业'
    },
    {
      value: "215",
      label: '科学研究和技术'
    },
    {
      value: "216",
      label: '居民服务'
    },
    {
      value: "217",
      label: '教育'
    },
    {
      value: "218",
      label: '卫生和社会工作'
    },
    {
      value: "219",
      label: '文化、体育和娱乐业'
    },
    {
      value: "220",
      label: '公共管理、社会保障'
    },
    {
      value: "221",
      label: '工业'
    },
    {
      value: "222",
      label: '其他'
    },
  ],
};


const getters = {
  companyListByIndustryCode: state => state.companyListByIndustryCode,
  companyTypeListPub: state => state.companyTypeListPub,
  industryCodeListPub: state => state.industryCodeListPub,

};

const mutations = {
  [MUTATIONS.companyListByIndustryCode_mu](state, newList) {
    state.companyListByIndustryCode = newList;
  },

};

export default {
  state,
  getters,
  mutations
}
