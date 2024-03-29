<template>
  <div class="w-full">
    <RoundedCard noWidthLimit class="flex flex-col gap-4 p-4">
      <AutoCompleteInput
        v-model="_modelValue"
        :name="name"
        :autoCompleteList="autoCompleteList"
        @on-auto-complete-option-selected="selectAutoCompleteOption"
        clearable
      >
        <template #beforeInput>
          <span class="icon-md">search</span>
        </template>
        <template #autoCompleteOption="recipeLabelOption">
          <div class="flex items-center gap-2">
            <span class="icon-md">label</span>
            <RecipeLabelTag
              :name="recipeLabelOption.option.name"
              :category="recipeLabelOption.option.category"
            />
          </div>
        </template>
      </AutoCompleteInput>

      <div
        v-show="_labelFilterList.length > 0"
        class="flex items-center gap-2 rounded-xl bg-stone-200 p-2"
      >
        <span class="icon-md">filter_alt</span>
        <ul class="inline-flex grow flex-row flex-wrap gap-2">
          <li v-for="(label, idx) in _labelFilterList">
            <RecipeLabelTag
              :name="label.name"
              :category="label.category"
              @click="_labelFilterList.splice(idx, 1)"
              closeable
            />
          </li>
        </ul>
        <button class="icon-md" @click="clearLabelFilterList">clear</button>
      </div>
    </RoundedCard>
  </div>
</template>

<script setup lang="ts">
import RoundedCard from "./RoundedCard.vue";
import RecipeLabelTag from "./RecipeLabelTag.vue";
import AutoCompleteInput from "./AutoCompleteInput.vue";
import { getRecipeLabelList } from "../api/recipeDbApi";
import { RecipeLabel } from "../types/recipeDbTypes";
import { ref, watchEffect, PropType, reactive } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
  labelFilterList: {
    type: Array as PropType<RecipeLabel[]>,
    default: [],
  },
});
const emit = defineEmits(["update:modelValue", "update:labelFilterList"]);

const _modelValue = ref("");
watchEffect(() => {
  _modelValue.value = props.modelValue.toString();
});
watchEffect(() => {
  emit("update:modelValue", _modelValue.value);
});

const _labelFilterList = ref<RecipeLabel[]>([]);
const autoCompleteList = ref<RecipeLabel[]>([]);
watchEffect(async () => {
  if (_modelValue.value.length > 0) {
    const filteredLabelList = await getRecipeLabelList(_modelValue.value);
    autoCompleteList.value = filteredLabelList.filter((label) => {
      return (
        _labelFilterList.value.findIndex(
          (filterListLabel) => filterListLabel.id === label.id
        ) < 0
      );
    });
  }
});
watchEffect(() => {
  _labelFilterList.value = props.labelFilterList;
});
watchEffect(() => {
  emit("update:labelFilterList", _labelFilterList.value);
});

function selectAutoCompleteOption(recipeLabel: RecipeLabel) {
  _labelFilterList.value.push(recipeLabel);
  _modelValue.value = "";
}
function clearLabelFilterList() {
  _labelFilterList.value = [];
}
</script>
