import { defineStore } from "pinia";
import { ref } from "vue";
import type { MenuItem } from "@/types/user";
export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<MenuItem[]>([])
  const currentTab = ref<{ name: string, url: string }>({ name: '', url: '' })

  const addTab = (name: string, url: string, icon: string) => {
    if (!tabs.value.some((tab) => tab.url === url)) {
      tabs.value.push({ name, url, icon })
    }
  }

  const setCurrentTab = (name: string, url: string) => {
    currentTab.value = { name, url }
  }

  const removeTab = (name: string) => {
    const currentIndex = tabs.value.findIndex(tab => tab.name === name)
    tabs.value = tabs.value.filter(tab => tab.name !== name)

    // 如果删除的是当前激活的标签
    if (name === currentTab.value.name) {
      // 如果还有剩余标签
      if (tabs.value.length > 0) {
        // 如果删除的是第一个标签，激活新的第一个标签
        if (currentIndex === 0) {
          currentTab.value = {
            name: tabs.value[0].name,
            url: tabs.value[0].url
          }
        } else {
          // 否则激活删除位置的前一个标签
          currentTab.value = {
            name: tabs.value[currentIndex - 1].name,
            url: tabs.value[currentIndex - 1].url
          }
        }
      } else {
        // 如果没有剩余标签，清空当前激活标签
        currentTab.value = { name: '', url: '' }
      }

    }

  }

  return { tabs, addTab, currentTab, setCurrentTab, removeTab }
}) 