import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"

type Inputs = {
  competitions: [
    {
      title: string
      subTitle: string
      date: string
      competitionName: string
      competitionHost: string
      url: string}
  ]

}
export function CreateCompetitionList() {

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const {

    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },

  } = useForm<Inputs>({
    defaultValues: {competitions: [{ title: "", subTitle: "", date: "", competitionName: "", competitionHost: "", exampleRequired: "" }]}
})


  const { fields, append, remove } = useFieldArray({
    control,
    name: "competitions",
  });

  return (
    <div>
      <h1>Create competition list</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {fields.map((item, index) => (
            <div key={item.id}>
              <label htmlFor="">Otsikko</label>
              <input {...register(`competitions.${index}.title` as const)} />
              <br/>
              <label htmlFor="">Alaotsikko</label>
              <input {...register(`competitions.${index}.subTitle` as const)} />
              <br/>
              <label htmlFor="">Päivämäärä</label>

              <input {...register(`competitions.${index}.date` as const)} />
              <br/>
              <label htmlFor="">Kilpailun nimi</label>

              <input {...register(`competitions.${index}.competitionName` as const)} />
              <br/>
              <label htmlFor="">Kilpailun järjestäjä</label>

              <input {...register(`competitions.${index}.competitionHost` as const)} />
              <br/>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            append({
              name: "",
              quantity: 0,
              price: 0
            })
          }
        >
          APPEND
        </button>
        <input type="submit"/>
      </form>
    </div>
  )
}
