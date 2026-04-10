export default function Footer() {
  return (
    <footer className="mx-auto mt-16 w-full max-w-4xl px-4 pb-10 sm:px-6">
      <div className="border-t border-white/8 pt-8">
        {/* Legal text */}
        <p className="text-center text-[12px] leading-relaxed text-white/30">
          Todo o conteúdo desta plataforma é apenas para visualização pessoal. A redistribuição,
          cópia ou compartilhamento de conteúdo premium é estritamente proibido.
        </p>
        <p className="mt-3 text-center text-[12px] leading-relaxed text-white/25">
          Ao acessar e usar esta plataforma, você concorda com os seguintes termos e condições.
          As assinaturas são cobradas de acordo com o plano escolhido. Você pode cancelar a qualquer
          momento pelas configurações da conta. Reembolsos: entre em contato com nosso suporte com
          seu e-mail de conta e motivo. Responderemos em até 3 dias úteis.
        </p>
        <p className="mt-4 text-center text-[11px] text-white/20">
          © {new Date().getFullYear()} Nicole VIP · Conteúdo adulto · +18
        </p>
      </div>
    </footer>
  );
}
