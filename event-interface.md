## Player to Server

```ts
questionAnswered => answer: string 

disconnect => void  
```

## Host Player to Server

```ts
startGame => void  

kickMember => memberName: string
```

## Server to Player

```ts
gameFinished => winners: { Name: string; Points: number }[]  

roundOver => solution: string, playerPoints: number, topPlayers: { Name: string; Points: number }[]  

playersChange => players: string[]  

newQuestion => question: { question: string; prompt: string }  

gameStart => void  
```