import * as Yup from 'yup'

export const getSinglById = Yup.object().shape({
  id: Yup.string().uuid().required('Uuid must to be not null'),
})
