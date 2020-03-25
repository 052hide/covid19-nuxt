<template>
  <div
    :class="[
      { 'is-disabled': isDisabled, 'is-align-right': isAlignRight },
      theme,
      sizeClass,
      roundedClass
    ]"
    class="atom-select"
  >
    <div class="atom-select__label">
      <p class="label--selected">
        <template v-if="selectedItemLabel">{{ selectedItemLabel }}</template>
      </p>
      <p class="label--icon">▼</p>
    </div>
    <select
      v-model="country"
      class="atom-select__select"
      @input="$emit('input', $event.target.value)"
    >
      <option
        v-for="(item, index) in items"
        :key="index"
        :value="item[field.value]"
        >{{ item[field.label] }}</option
      >
    </select>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class index extends Vue {
  @Prop({ default: 'secondary' }) theme?: 'primary' | 'secondary'
  @Prop({ default: false }) isDisabled?: boolean
  @Prop({ default: false }) isAlignRight?: boolean
  @Prop({ default: 'full' }) size?: 'sm' | 'md' | 'lg' | 'full'
  @Prop({ default: 'sm' }) rounded?: 'sm' | 'md' | 'full'
  @Prop({ default: () => ({ value: 'value', label: 'label' }) }) field?: {
    value: string
    label: string
  }

  @Prop() items!: { [key: string]: any }[]
  @Prop() selected!: string

  country: string = ''

  get selectedItemLabel(): string {
    let res = ''
    this.items.some((item) => {
      if (this.field) {
        if (item[this.field.value] === this.country) {
          res = item[this.field.label]
          return true
        }
      } else {
        return true
      }
    })
    return res
  }

  get sizeClass(): string {
    return this.size ? `size--${this.size}` : ''
  }

  get roundedClass(): string {
    return this.rounded ? `rounded--${this.rounded}` : ''
  }

  mounted() {
    this.country = this.selected
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
