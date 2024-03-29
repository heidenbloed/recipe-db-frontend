export interface PaginationResult<Data> {
  count: number;
  next?: string;
  previous?: string;
  results: Data;
}

export interface Model {
  id: number;
}

export interface UpdatedableModel extends Model {
  updated_at: number;
}

export interface RecipeImageShort extends UpdatedableModel {
  image: string;
  thumbnail_card: string | null;
  thumbnail_plan: string | null;
  image_width: number;
  image_height: number;
  thumbnail_card_width: number | null;
  thumbnail_card_height: number | null;
  thumbnail_plan_width: number | null;
  thumbnail_plan_height: number | null;
}

export interface RecipeImage extends RecipeImageShort {
  order: number;
}

export interface RecipeImageEdit {
  recipe: number;
  image: Blob;
  order: number;
}

export interface RecipeImageEditResponse extends RecipeImage {
  recipe: number;
}

export interface ImageInfo {
  url: string;
  width: number;
  height: number;
}

export interface RecipeLabel extends Model {
  name: string;
  category: string;
}

export interface IngredientShort extends UpdatedableModel {
  name: string;
}

export interface Unit extends Model {
  short_form: string;
}

export interface IngredientCategory extends Model {
  name: string;
  location_index: number;
}

export interface UnitConversion extends UpdatedableModel {
  alternative_unit: Unit;
  alternative_conversion_factor: number;
  default_conversion_factor: number;
}

export interface Ingredient extends IngredientShort {
  default_unit: Unit;
  category: IngredientCategory;
  unit_conversions: UnitConversion[];
}

export interface UnitConversionEdit {
  alternative_unit: number;
  alternative_conversion_factor: number;
  default_conversion_factor: number;
}

export interface IngredientEdit {
  name: string;
  default_unit: number;
  category: number;
  unit_conversions: UnitConversionEdit[];
}

export interface IngredientEditResponse
  extends IngredientEdit,
    UpdatedableModel {}

export interface QuantifiedIngredient extends UpdatedableModel {
  ingredient: IngredientShort;
  quantity: number;
  unit: Unit;
}

export interface QuantifiedIngredientEdit {
  ingredient: number;
  quantity: number;
  unit: number;
}

export interface RecipeShort extends UpdatedableModel {
  name: string;
  preparation_time: number;
  first_image?: RecipeImageShort;
}

export interface RecipeData extends Omit<RecipeShort, "first_image"> {
  source: string;
  num_servings: number;
  preparation_text: string;
  labels: RecipeLabel[];
  quantified_ingredients: QuantifiedIngredient[];
  recipe_images: RecipeImage[];
}

export interface RecipeEdit {
  name: string;
  preparation_time: number;
  source: string;
  num_servings: number;
  preparation_text: string;
  labels: number[];
  quantified_ingredients: QuantifiedIngredientEdit[];
}

export interface RecipeEditResponse extends RecipeEdit, UpdatedableModel {}

export interface QuantifiedIngredientEditData {
  id?: number;
  ingredientId: number | null;
  ingredientName: string;
  ingredientCategory: IngredientCategory;
  quantity: number | "";
  unit: Unit;
  defaultUnit: Unit | null;
  currentConversionFactor: number | "";
  defaultConversionFactor: number | "";
  setAsDefaultUnit: boolean;
}

export interface RecipeImageEditData {
  id?: number;
  image: string;
  order: number;
  data?: Blob;
}

export interface RecipeEditData {
  id?: number;
  name: string;
  preparation_time: number | "";
  source: string;
  num_servings: number;
  preparation_text: string;
  labels: RecipeLabel[];
  quantified_ingredients: QuantifiedIngredientEditData[];
  recipe_images: RecipeImageEditData[];
}

export interface PushSubscriptionInfo {
  auth_key: string;
  p256dh_key: string;
  notify_at_new_recipes: boolean;
}

export interface PushSubscriptionInfoFull extends PushSubscriptionInfo {
  endpoint: string;
}
