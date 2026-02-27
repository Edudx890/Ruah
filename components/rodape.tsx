export function Rodape() {
  return (
    <footer className="bg-ruah-brown text-ruah-beige py-12 border-t-4 border-ruah-gold">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-serif text-2xl mb-1 text-ruah-beige">RUAH</h4>
            <p className="text-sm text-ruah-sand">Assessoria, Consultoria e Comercio LTDA</p>
            <p className="text-xs text-ruah-sand/70 mt-1">CNPJ: 54.522.139/0001-24</p>
          </div>
          <div className="text-center text-sm text-ruah-sand">
            <p>SAUS Q 5 BL K N 17, Sala 0403</p>
            <p>Asa Sul, Brasilia - DF | 70.070-050</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-ruah-sand">
              &copy; {new Date().getFullYear()} RUAH. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
