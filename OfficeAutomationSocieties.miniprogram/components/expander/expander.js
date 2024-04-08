// components/expander/expander.js
Component({
  properties: {
    content: String, // 传入的内容
  },
  data: {
    expanded: false, // 初始状态为收缩
  },
  methods: {
    toggleContent() {
      this.setData({
        expanded: !this.data.expanded // 切换状态
      });
    }
  },
})
