'use client'
import { useEffect, useState } from "react"
import { ComprasI } from "@/utils/types/compras"
import ItemCompra from "@/components/ItemCompras";

function ControleCompras() {
  const [compras, setCompras] = useState<ComprasI[]>([])

  useEffect(() => {
    async function getCompras() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/compras`)
      const dados = await response.json()
      setCompras(dados)
    }
    getCompras()
  }, [])

  const listacompras = compras.map(compra => (
    <ItemCompra key={compra.id} compra={compra} compras={compras} setCompras={setCompras} />
  ))

  return (
    <div className='m-4 mt-24'>
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Controle de Vendas
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto do Óculos
              </th>
              <th scope="col" className="px-6 py-3">
                Modelo
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Endereço de Entrega
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listacompras}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ControleCompras