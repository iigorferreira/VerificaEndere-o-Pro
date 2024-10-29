import React from 'react';
import { Building2, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import AddressForm from './components/AddressForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const handleAddressSubmit = (address: Partial<Address>) => {
    // TODO: Implementar lógica de verificação de endereço
    console.log('Endereço enviado:', address);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Building2 className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">VerificaEndereço Pro</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">Verificações Ativas: 42</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">Verificados: 128</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">Pendentes: 15</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AddressForm onSubmit={handleAddressSubmit} />
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Verificações Recentes</h2>
                <div className="space-y-4">
                  {[
                    {
                      address: "Rua Augusta, 123 - Centro",
                      status: "verified",
                      time: "2 minutos atrás"
                    },
                    {
                      address: "Av. Paulista, 1000 - Bela Vista",
                      status: "pending",
                      time: "15 minutos atrás"
                    },
                    {
                      address: "Rua Oscar Freire, 789 - Jardins",
                      status: "failed",
                      time: "1 hora atrás"
                    }
                  ].map((verification, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
                      {verification.status === "verified" && (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      )}
                      {verification.status === "pending" && (
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-1" />
                      )}
                      {verification.status === "failed" && (
                        <AlertCircle className="h-5 w-5 text-red-500 mt-1" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{verification.address}</p>
                        <p className="text-xs text-gray-500">{verification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas Rápidas</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Taxa de Sucesso</p>
                    <p className="text-2xl font-bold text-blue-700">94%</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Verificações Hoje</p>
                    <p className="text-2xl font-bold text-green-700">28</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-600 font-medium">Tempo Médio</p>
                    <p className="text-2xl font-bold text-yellow-700">1,2s</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">Usuários Ativos</p>
                    <p className="text-2xl font-bold text-purple-700">12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;