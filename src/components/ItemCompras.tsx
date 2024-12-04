'use client'
import { Dispatch, SetStateAction } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import Cookies from "js-cookie"
import { ComprasI } from "@/utils/types/compras"

interface listaCompraProps {
  compra: ComprasI,
  compras: ComprasI[],
  setCompras: Dispatch<SetStateAction<ComprasI[]>>
}

function ItemCompra({ compra, compras, setCompras }: listaCompraProps) {

  async function excluirCompra() {

    if (confirm(`Confirmar exclusão da compra do óculos ${compra.oculos.modelo} feita por ${compra.cliente.nome}?`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/compras/${compra.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const compras2 = compras.filter(x => x.id != compra.id)
        setCompras(compras2)
        alert("Compra excluída com sucesso")
      } else {
        alert("Erro... compra não foi excluída")
      }
    }
  }

  return (
    <tr key={compra.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={compra.oculos.foto} alt="Foto do oculos"
          style={{ width: 200 }} />
      </th>
      <td className={"px-6 py-4"}>
        {compra.oculos.modelo}
      </td>
      <td className={"px-6 py-4"}>
        {Number(compra.oculos.preco).toLocaleString("pt-br", {minimumFractionDigits: 2})}
      </td>
      <td className={`px-6 py-4`}>
        {compra.cliente.nome}
      </td>
      <td className={`px-6 py-4`}>
        {compra.endereco}
      </td>
      <td className="px-6 py-4">
      <button onClick={excluirCompra} className="text-red-600 hover:text-red-900">
          <TiDeleteOutline />
        </button>
      </td>
    </tr>
  )
}

export default ItemCompra