'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { MarcaI } from "@/utils/types/marcas"

type Inputs = {
  preco: number
  destaque: boolean
  foto: string
  formato: string
  material: string
  genero: string
  descricao: string
  marcaId: number
  modelo: string
}

function NovoOculos() {
  const [marcas, setMarcas] = useState<MarcaI[]>([])
  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  useEffect(() => {
    async function getMarcas() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/marcas`)
      const dados = await response.json()
      setMarcas(dados)
    }
    getMarcas()
    setFocus("modelo")
  }, [])

  const optionsMarca = marcas.map(marca => (
    <option key={marca.id} value={marca.id}>{marca.nome}</option>
  ))

  async function incluirOculos(data: Inputs) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/oculos`, {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        method: "POST",
        body: JSON.stringify({
          preco: Number(data.preco),
          destaque: data.destaque,
          foto: data.foto,
          formato: data.formato,
          material: data.material,
          genero: data.genero,
          descricao: data.descricao,
          marcaId: Number(data.marcaId),
          modelo: data.modelo
        })
      },
    )

    if (response.status == 201) {
      toast.success("Ok! Oculos cadastrado com sucesso")
      reset()
    } else {
      toast.error("Erro no cadastro do Oculos...")
      console.log(data)
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Inclusão de Oculos
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirOculos)}>
        <div className="mb-3">
          <label htmlFor="modelo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Modelo do Oculos</label>
          <input type="text" id="modelo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("modelo")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Preço</label>
          <input type="number" id="preco"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("preco")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="destaque" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Destaque</label>
          <input type="checkbox" id="destaque"
            className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("destaque")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Foto</label>
          <input type="text" id="foto"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("foto")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formato" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Formato</label>
          <select id="formato"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("formato")}>
            <option>Quadrado</option>
            <option>Redondo</option>
            <option>Irregular</option>
            <option>Piloto</option>
            <option>Gatinho</option>
            <option>Retangular</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="material" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Material</label>
          <input type="text" id="material"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("material")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genero" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Gênero</label>
          <select id="genero"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("genero")}>
            <option>Masculino</option>
            <option>Feminino</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Descrição</label>
          <textarea id="descricao"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("descricao")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="marca" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Marca</label>
          <select id="marca"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("marcaId")}>
            {optionsMarca}
          </select>
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Incluir</button>
      </form>
    </>
  )
}

export default NovoOculos