import setup from "../assets/images/feature-benefits/setup.jpg";

export const ThirdDescription = () => {
  return (
    <div className="flex items-center gap-16">
      <div className="flex-1">
        <img src={setup} alt="gaming pc" className="rounded-2xl" />
      </div>
      <div className="flex-1">
        <h3 className="text-[#AEDFF7] font-bold text-2xl mb-4">
          Espandi le possibilità con la nostra selezione
        </h3>
        <ul className="text-white list-disc">
          <li>
            Configurazione flessibile: adatta il tuo sistema alle tue esigenze
            in evoluzione con una vasta gamma di componenti compatibili,
            garantendo un'espansione senza limiti.
          </li>
          <li>
            Silenziosità di eccellenza: grazie a un design attentamente studiato
            per ridurre al minimo il rumore, i nostri componenti assicurano
            un'esperienza di utilizzo tranquilla e senza distrazioni.
          </li>
          <li>
            Installazione semplice e veloce: approfitta di un processo di
            installazione veloce e intuitivo, sia che tu sia un esperto o un
            principiante, per iniziare a goderti il nuovo hardware in pochi
            passi.
          </li>
        </ul>
      </div>
    </div>
  );
};