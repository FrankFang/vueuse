import type { Ref } from 'vue-demi'
import { computed, ref } from 'vue-demi'
import type { MaybeComputedRef, MaybeRef } from '@vueuse/shared'
import { resolveUnref } from '@vueuse/shared'

/**
 * Reactively access a value no greater than max.
 *
 * @see https://vueuse.org/useMinimum
 * @param value1
 * @param value2
 */
export function useMinimum(defaultValue: MaybeRef<number>, ...mins: MaybeComputedRef<number>[]): Ref<number> {
  const _value = ref(defaultValue)
  return computed<number>({
    get() {
      return _value.value = Math.min(_value.value, ...mins.map(value => resolveUnref(value)))
    },
    set(value) {
      _value.value = Math.min(value, ...mins.map(value => resolveUnref(value)))
    },
  })
}

export const useMin = useMinimum
