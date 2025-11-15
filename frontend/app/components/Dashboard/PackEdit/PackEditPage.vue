<template>
    <div class="component-PackEditPage">

    </div>
</template>

<script lang="ts">
import type { Pack } from '~/interfaces/pack';

interface IData {
    packList: Pack[]
    loading: {
        packs: boolean
    }
}
export default {
    data: (): IData => ({
        packList: [],
        loading: {
            packs: false
        }
    }),
    methods: {
        
    }
}
</script>

<style scoped lang="less">
.component-PackEditPage {

}
</style>