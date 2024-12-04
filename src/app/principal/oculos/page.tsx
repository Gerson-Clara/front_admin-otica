'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'

import ItemOculos from '@/components/ItemOculos'
import { OculosI } from "@/utils/types/oculos"

function CadOculos() {
  const [oculos, setOculos] = useState<OculosI[]>([])

  useEffect(() => {
    async function getOculos() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/oculos`)
      const dados = await response.json()
      setOculos(dados)
    }
    getOculos()
  }, [])

  const listaoculos = oculos.map(armacao => (
    <ItemOculos key={armacao.id} oculos={armacao} oculoss={oculos} setOculos={setOculos} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de Óculos
        </h1>
        <Link href="oculos/novo" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Novo oculos
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Modelo do oculos
              </th>
              <th scope="col" className="px-6 py-3">
                Marca
              </th>
              <th scope="col" className="px-6 py-3">
                Formato
              </th>
              <th scope="col" className="px-6 py-3">
                Material
              </th>
              <th scope="col" className="px-6 py-3">
                Gênero
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaoculos}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadOculos