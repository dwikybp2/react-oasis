import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully crated');
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    mutate(data);
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input type="text" id="name" {...register('name', {
          required: 'THis field is required',
        })} />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message} >
        <Input type="number" id="maxCapacity" {...register('maxCapacity', {
          required: 'THis field is required',
          min: {
            value: 1,
            message: 'Capacity should be at leat 1',
          },
        })} />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message} >
        <Input type="number" id="regularPrice" {...register('regularPrice', {
          required: 'THis field is required',
          min: {
            value: 1,
            message: 'Capacity should be at leat 1',
          },
        })} />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message} >
        <Input type="number" id="discount" defaultValue={0} {...register('discount', {
          required: 'THis field is required',
          validate: (value) => value > getValues().regularPrice || 'Discount should be lest than regular price',
        })} />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message} >
        <Textarea type="number" id="description" defaultValue="" {...register('description', {
          required: 'THis field is required',
        })} />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message} >
        <FileInput id="image" accept="image/*" {...register('image', {
          required: 'THis field is required',
        })} />
      </FormRow>

      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow2>
    </Form>
  );
}

export default CreateCabinForm;
