import { useEffect, useState } from "react";

const screenSize = () => {
    // Obtenir la largeur de l'écran
    const width = window.innerWidth;

    // Définir les tailles d'écran
    const xs = 600;
    const sm = 900;
    const md = 1200;
    const lg = 1536;
    // const xl = 1440;

    // Comparer la largeur de l'écran aux tailles d'écran définies
    if (width < xs) {
        return "xs";
    } else if (width < sm) {
        return "sm";
    } else if (width < md) {
        return "md";
    } else if (width < lg) {
        return "lg";
    } else {
        return "xl";
    }
}

const Screen = () => {
    const [size, setSize] = useState(screenSize());

    useEffect(() => {
        const handleResize = () => {
            setSize(screenSize());
        };

        // Écouter l'événement de changement de taille d'écran
        window.addEventListener('resize', handleResize);

        // Nettoyer l'écouteur d'événement lors du démontage du composant
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return size;
}

export default Screen;