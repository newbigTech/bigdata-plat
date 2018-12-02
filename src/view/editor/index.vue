<template>
  <div>
    <Row :gutter="14" style="margin-top: 14px;height: 700px">
      <i-col span="4">
        <!--<Card>-->
          <!--<Tree :data="data4" @on-select-change="onSelect" show-checkbox multiple></Tree>-->
        <!--</Card>-->
          <ButtonGroup>
            <Button icon="ios-color-wand-outline">新增</Button>
            <Button icon="ios-sunny-outline">删除</Button>
            <Button icon="ios-crop">Shell</Button>
          </ButtonGroup>
        <Menu :theme="theme2">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper" />
              内容管理
            </template>
            <MenuItem name="1-1">文章管理</MenuItem>
            <MenuItem name="1-2">评论管理</MenuItem>
            <MenuItem name="1-3">举报管理</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-people" />
              用户管理
            </template>
            <MenuItem name="2-1">新增用户</MenuItem>
            <MenuItem name="2-2">活跃用户</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-stats" />
              统计分析
            </template>
            <MenuGroup title="使用">
              <MenuItem name="3-1">新增和启动</MenuItem>
              <MenuItem name="3-2">活跃分析</MenuItem>
              <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
              <MenuItem name="3-4">用户留存</MenuItem>
              <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
          </Submenu>
        </Menu>
      </i-col>
      <i-col span="20" class="padding-left-4">
          <div id="container" style="height: 800px"></div>
      </i-col>
    </Row>
    </div>
</template>

<script>
import * as monaco from 'monaco-editor'
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
      theme2: 'light',
      buttonOptions: {
        trigger: '.draggable-btn',
        body: '.draggable-btn'
      },
      statu: 1,
      monacoEditor: null,
      java: '        System.setProperty("server.port", "8081");\n' +
      '\n' +
      '        SpringApplication springApplication = new SpringApplication(DirectClientApplication.class);\n' +
      '\n' +
      '        ApplicationContext applicationContext = springApplication.run(args);\n' +
      '\n' +
      '        DirectService directService = (DirectService) applicationContext.getBean("directServiceReference");\n' +
      '\n' +
      '        String result = directService.sayDirect("direct");\n' +
      '        System.out.println("invoke result:" + result);\n' +
      '\n' +
      '        if ("direct".equalsIgnoreCase(result)) {\n' +
      '            System.out.println("direct invoke success");\n' +
      '        } else {\n' +
      '            System.out.println("direct invoke fail");\n' +
      '        }public class Main {\n' +
      '    public static void main(String args[]) {\n' +
      '        System.out.println("Hello World!");\n' +
      '    }\n' +
      '}',
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
  mounted () {
    this.monacoEditor = monaco.editor.create(document.getElementById('container'), {
      value: this.java,
      language: 'java',
      minimap: {
        enabled: false
      },
      readOnly: false,
      automaticLayout: true,
      dragAndDrop: true,
      fontFamily: 'Source Code Pro',
      fontSize: 20,
      parameterHints: true,
      renderIndentGuides: true,
      lineNumbersMinChars: 3,
      theme: 'vs',
      scrollBeyondLastLine: true
    })
  },
  methods: {
    showModal () {
      this.modalVisible = true
    },
    onSelect (selectedList) {
      const node = selectedList[selectedList.length - 1] // 获取当前点击的节点
      if (node) {
        console.log(node)
      }
    }
  }
}
</script>

<style>

</style>
