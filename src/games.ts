export type Game = {id:string;title:string;type:string;description:string;directive:string;url?:string;status:'online'|'concept'};
export const games:Game[] = [
 {id:'wolfenstein-experiment',title:'Wolfenstein Experiment',type:'FPS / PROTOTYPE',description:'A compact first-person survival experiment.',directive:'survive.',status:'online',url:''},
 {id:'pokemon-tcg-ai',title:'Pokémon TCG AI',type:'STRATEGY / AI',description:'A card-game experiment in planning and adaptation.',directive:'predict.',status:'online',url:''},
 {id:'black-signal',title:'Black Signal',type:'ROGUELIKE / CONCEPT',description:'A signal with no known origin.',directive:'remember.',status:'concept'}
];