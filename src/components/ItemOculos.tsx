'use client'
import { Dispatch, SetStateAction, useEffect } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import Cookies from "js-cookie"
import { OculosI } from "@/utils/types/oculos";

interface listaOculosProps {
  oculos: OculosI,
  oculoss: OculosI[],
  setOculos: Dispatch<SetStateAction<OculosI[]>>
}

function ItemOculos({ oculos, oculoss, setOculos }: listaOculosProps) {

  async function excluiroculos() {

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/oculos/${oculos.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const oculoss2 = oculoss.filter(x => x.id != oculos.id)
        setOculos(oculoss2)
        alert("oculos excluído com sucesso")
      } else {
        alert("Erro... oculos não foi excluído")
      }
    }
  }

  async function alterarDestaque() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/oculos/destacar/${oculos.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
      },
    )

    if (response.status == 200) {
      const oculoss2 = oculoss.map(x => {
        if (x.id == oculos.id) {
          return { ...x, destaque: !x.destaque }
        }
        return x
      })
      setOculos(oculoss2)
    }
  }

  return (
    <tr key={oculos.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={oculos.foto} alt="Capa do oculos"
          style={{width: 200}} />
      </th>
      <td className={`px-6 py-4 ${oculos.destaque ? "font-extrabold" : ""}`}>
        {oculos.modelo}
      </td>
      <td className={`px-6 py-4 ${oculos.destaque ? "font-extrabold" : ""}`}>
        {oculos.marca.nome}
      </td>
      <td className={`px-6 py-4 ${oculos.destaque ? "font-extrabold" : ""}`}>
        {oculos.formato}
      </td>
      <td className={`px-6 py-4 ${oculos.destaque ? "font-extrabold" : ""}`}>
        {oculos.material}
      </td>
      <td className={`px-6 py-4 ${oculos.destaque ? "font-extrabold" : ""}`}>
        {oculos.genero}
      </td>
      <td className={`px-6 py-4 ${oculos.destaque ? "font-extrabold" : ""}`}>
        {Number(oculos.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluiroculos} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}

export default ItemOculos