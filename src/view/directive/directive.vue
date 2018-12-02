<template>
  <div>
    <Row :gutter="10">
      <i-col span="6">
        <Card>
          <div class="i18n-card-box">
        <Tree :data="data4" show-checkbox multiple></Tree>
          </div>
        </Card>
      </i-col>
    </Row>
    </div>
    <!--<Row>-->
      <!--<i-col>-->
        <!--<Card>-->
          <!--<Row>-->
            <!--<i-col span="5">-->
              <!--<Button type="primary" @click="showModal">显示可拖动弹窗</Button>-->
              <!--<br/>-->
              <!--<Button v-draggable="buttonOptions" class="draggable-btn">这个按钮也是可以拖动的</Button>-->
            <!--</i-col>-->
            <!--<i-col span="19">-->
              <!--<div class="intro-con">-->
                <!--&lt;Modal v-draggable="options" v-model="visible"&gt;标题&lt;/Modal&gt;-->
                <!--<pre class="code-con">-->
    <!--options = {-->
      <!--trigger: '.ivu-modal-body',-->
      <!--body: '.ivu-modal'-->
    <!--}-->
                <!--</pre>-->
              <!--</div>-->
            <!--</i-col>-->
          <!--</Row>-->
        <!--</Card>-->
      <!--</i-col>-->
      <!--<Modal v-draggable="options" v-model="modalVisible">-->
        <!--拖动这里即可拖动整个弹窗-->
      <!--</Modal>-->
    <!--</Row>-->
  </div>
</template>

<script>
export default {
  name: 'directive_page',
  data () {
    return {
      modalVisible: false,
      options: {
        trigger: '.ivu-modal-body',
        body: '.ivu-modal',
        recover: true
      },
      buttonOptions: {
        trigger: '.draggable-btn',
        body: '.draggable-btn'
      },
      statu: 1,
      split1: 0.3,
      data4: [
        {
          title: 'parent 1',
          expand: true,
          selected: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1',
                  disabled: true
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1',
                  checked: true
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    showModal () {
      this.modalVisible = true
    }
  }
}
</script>

<style>
.intro-con{
  min-height: 140px;
}
.draggable-btn{
  margin-top: 20px;
}
.code-con{
  width: 400px;
  background: #F9F9F9;
  padding-top: 10px;
}
.demo-split{
  height: 500px;
  border: 1px solid #dcdee2;
}
.demo-split-pane{
  padding: 10px;
}
</style>
