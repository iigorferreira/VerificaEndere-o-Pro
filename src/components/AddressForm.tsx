import React, { useState } from 'react';
import { Search, MapPin, Home, Info } from 'lucide-react';
import AddressMap from './AddressMap';
import { useMutation } from '@tanstack/react-query';

interface AddressFormProps {
  onSubmit: (address: Partial<Address>) => void;
  initialData?: Partial<Address>;
}

async function validateCEP(cep: string) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  if (!response.ok) throw new Error('CEP inválido');
  return response.json();
}

export default function AddressForm({ onSubmit, initialData }: AddressFormProps) {
  const [address, setAddress] = useState<Partial<Address>>(initialData || {});
  const [coordinates, setCoordinates] = useState({
    latitude: initialData?.latitude || -23.550520,
    longitude: initialData?.longitude || -46.633308
  });

  const cepMutation = useMutation({
    mutationFn: validateCEP,
    onSuccess: (data) => {
      if (!data.erro) {
        setAddress({
          ...address,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
          postalCode: data.cep
        });
      }
    }
  });

  const handleCEPBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      cepMutation.mutate(cep);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...address, ...coordinates });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="flex items-center space-x-2 text-blue-600 mb-4">
          <Home className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Detalhes do Endereço</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">CEP</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={address.postalCode || ''}
              onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
              onBlur={handleCEPBlur}
              placeholder="00000-000"
              required
            />
            {cepMutation.isPending && <p className="text-sm text-blue-600">Buscando CEP...</p>}
            {cepMutation.isError && <p className="text-sm text-red-600">CEP não encontrado</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Rua</label>
            <div className="mt-1 relative">
              <input
                type="text"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={address.street || ''}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                required
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Número</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={address.number || ''}
              onChange={(e) => setAddress({ ...address, number: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Complemento</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={address.complement || ''}
              onChange={(e) => setAddress({ ...address, complement: e.target.value })}
              placeholder="Apto, Sala, Conjunto, etc"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bairro</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={address.neighborhood || ''}
              onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cidade</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={address.city || ''}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={address.state || ''}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              required
            >
              <option value="">Selecione...</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center space-x-2 text-blue-600 mb-4">
            <MapPin className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Confirmação de Localização</h3>
          </div>
          <AddressMap
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
            onLocationChange={(lat, lng) => setCoordinates({ latitude: lat, longitude: lng })}
            isEditable
          />
        </div>

        <div className="mt-6">
          <div className="flex items-center space-x-2 text-blue-600 mb-4">
            <Info className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Informações Adicionais</h3>
          </div>
          <textarea
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Adicione pontos de referência, cor do prédio ou outras informações relevantes..."
            value={address.referencePoints || ''}
            onChange={(e) => setAddress({ ...address, referencePoints: e.target.value })}
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Verificar Endereço
          </button>
        </div>
      </div>
    </form>
  );
}