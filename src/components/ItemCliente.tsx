"use client";
import { Dispatch, SetStateAction } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import Cookies from "js-cookie";
import { ClienteI } from "@/utils/types/clientes";

interface listaClienteProps {
  cliente: ClienteI;
  clientes: ClienteI[];
  setClientes: Dispatch<SetStateAction<ClienteI[]>>;
}

function ItemCliente({ cliente, clientes, setClientes }: listaClienteProps) {
  async function excluirCliente() {
    if (confirm(`Confirma Exclusão do cliente "${cliente.nome}"?`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${cliente.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: ("Bearer " + Cookies.get("admin_logado_token")) as string,
          },
        }
      );

      if (response.status == 200) {
        const clientes2 = clientes.filter((x) => x.id != cliente.id);
        setClientes(clientes2);
        alert("Cliente excluído com sucesso");
      } else {
        alert("Erro... cliente não foi excluído");
      }
    }
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {cliente.nome}
        </div>
      </td>
      <td>
        <div className="text-sm text-gray-500">
          {cliente.email}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button onClick={excluirCliente} className="text-red-600 hover:text-red-900">
          <TiDeleteOutline />
        </button>
      </td>
    </tr>
  );
}

export default ItemCliente;
