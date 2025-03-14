<template>
  <el-tabs v-model="currentTab.name" class="demo-tabs" @tab-click="handleClick" type="card" closable @tab-remove="remove">
    <el-tab-pane 
    v-for="item in tabs"
    :key="item.name"
    :label="item.name"
    :name="item.name"
    >
      <template #label>
        <span class="custom-tabs-label">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>&nbsp;{{ item.name }}</span>
        </span>
      </template>

    </el-tab-pane>
  </el-tabs>
  <router-view></router-view>
</template>

<script lang="ts" setup>

import { useTabsStore } from '@/store/tabs'
import { storeToRefs } from 'pinia';
import { useRouter,useRoute } from 'vue-router';
import { useUserStore } from '@/store/auth';
const tabsStore = useTabsStore()
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const {menu} = storeToRefs(userStore)
const {addTab,setCurrentTab,removeTab} = tabsStore

const {tabs,currentTab} = storeToRefs(tabsStore)

const handleClick = ({index}:{index:number}) => {
    router.push(tabs.value[index].url)
    setCurrentTab(tabs.value[index].name,tabs.value[index].url)//设置当前高亮
}

      //删除功能
const remove = (TabsPaneName : string) =>{
    removeTab(TabsPaneName)
    router.push(currentTab.value.url)
  }

function findObjectByUrl(arr:any[],url:string){
  for(const item of arr){
    if(item.url === url){
      return item
    }
    if(item.children){
      const found:any = findObjectByUrl(item.children,url)
      if(found){
        return found
      }
    }
  }
  return null
}

const {name,url,icon} = findObjectByUrl(menu.value,route.path)
addTab(name,url,icon)
setCurrentTab(name,url)

</script>

<style lang="less" scoped>
  .demo-tabs{
    ::v-deep .is-active{
      background-color: rgb(34, 136, 255)!important ;
      color:white!important;
    }
  }
</style>