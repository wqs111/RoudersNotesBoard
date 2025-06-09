<template>
    <button class="yk-button" :class="[size,nom]"><slot></slot></button>
</template>

<script>


export default {
    props: {
        size: {
            default: 'base',
        },
        nom: {
            default: 'primary',
        }
    }
}
</script>

<style lang="less" scoped>
.yk-button {
    text-align: center;
    border: none;
    
}

.max {
    min-width: 100px;
    height: 48px;
    border-radius: 24px;
    padding: 0 24px;
    // line-height: 48;
}
.base {
    min-width: 80px;
    height: 36px;
    border-radius: 20px;
    padding: 0 20px;
    // line-height: 36;
}
.small {
    min-width: 72px;
    height: 32px;
    border-radius: 24px;
    padding: 0 20px;
    // line-height: 24;
}

// nom
.primary {
    background: @gray-0;
    color: @gray-9;
}

.secondary {
    background: @gray-10;
    color: @gray-0;
    border: 1px solid @gray-0
}

.cprimary {
    background: @primary-color;
    color: @gray-9;
    font-weight: 600;
}

.csecondary {
    background: @gray-10;
    color: @gray-1;
}

.notallowed {
    cursor: not-allowed;
}

</style>