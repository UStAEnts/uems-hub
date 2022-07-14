import * as zod from "zod";

export const BasePart = zod.object({
	id: zod.string().optional(),
	prompt: zod.string(),
	detail: zod.string().optional(),
	required: zod.boolean().optional(),
});

export const TextValidator = BasePart.extend({
	type: zod.literal('text'),
	value: zod.string().optional(),
	area: zod.boolean().optional(),
});

export const CheckboxValidator = BasePart.extend({
	type: zod.literal('checkbox'),
	value: zod.boolean().optional(),
});

export const DateValidator = BasePart.extend({
	type: zod.literal('date'),
	value: zod.number().optional(),
});

export const OptionValidator = zod.string().or(zod.object({
	text: zod.string(),
	value: zod.string(),
}));
const SelectOptionValidator = BasePart.extend({
	type: zod.literal('select'),
	value: zod.string().or(OptionValidator).optional(),
	options: zod.array(OptionValidator),
});
const SelectReferenceValidator = BasePart.extend({
	type: zod.literal('select'),
	value: zod.string().or(OptionValidator).optional(),
	reference: zod.enum(['venue', 'event', 'state', 'ents', 'topic']).or(zod.object({
		data: zod.enum(['venue', 'event', 'state', 'ents', 'topic']),
		query: zod.string(),
	})),
})
export const SelectValidator = SelectOptionValidator.or(SelectReferenceValidator);

export const DateRangeValidator = BasePart.extend({
	type: zod.literal('date-range'),
	value: zod.object({
		start: zod.number(),
		end: zod.number(),
	}).optional(),
});

export const NumberValidator = BasePart.extend({
	type: zod.literal('number'),
	value: zod.number().optional(),
});

const Comparison = zod.object({
	type: zod.enum(['gt', 'lt', 'lte', 'gte', 'ne', 'eq']),
	target: zod.string(),//.regex(),
	value: zod.any(),
});

const Title = zod.object({
	type: zod.literal('title'),
	text: zod.string(),
});

const FlowStage = zod.number().or(zod.object({
	condition: zod.array(Comparison),
	stages: zod.number(),
}));

const Stage = CheckboxValidator
	.or(DateValidator)
	.or(DateRangeValidator)
	.or(NumberValidator)
	.or(SelectValidator)
	.or(TextValidator)
	.or(Title);

const StageValidator = zod.array(Stage);

export const FormValidator = zod.object({
	stages: zod.array(zod.object({
		title: zod.string(),
		questions: StageValidator,
	}).or(StageValidator)),
	flow: zod.array(FlowStage),
})