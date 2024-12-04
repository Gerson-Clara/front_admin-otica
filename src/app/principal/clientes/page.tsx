"use client";
import { useEffect, useState } from "react";
import { ClienteI } from "@/utils/types/clientes";
import ItemCliente from "@/components/ItemCliente";

function ControleClientes() {
  const [clientes, setClientes] = useState<ClienteI[]>([]);

  useEffect(() => {
    async function getClientes() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clientes`
      );
      const dados = await response.json();
      setClientes(dados);
    }
    getClientes();
  }, []);

  const listaclientes = clientes.map((cliente) => (
    <ItemCliente
      key={cliente.id}
      cliente={cliente}
      clientes={clientes}
      setClientes={setClientes}
    />
  ));

  return (
    <div className='m-4 mt-24'>
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Controle de Clientes
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>{listaclientes}</tbody>
        </table>
      </div>
    </div>
  )
}

export default ControleClientes;
