var orbitLandingDomain = "orbitxch.com"; // URL deiner Wettbörse
var orbitCommissionOnWinnings = true; // Wird die Orbit-Commission nur auf Gewinne angerechnet?
var orbitNameInExcel = "Orbit"; // Name der Wettbörse in der Excel

// Wie heißen die Buchmacher in deiner Excel?
const lookupBookiesExcel = {
	"1xbet" : "",
	"888sport" : "888sport",
	"admiral" : "AdmiralBet",
	"bet-at-home" : "bet-at-home",
	"bet3000" : "bet3000",
	"bet365" : "bet365",
	"bet90" : "",
	"betano" : "Betano",
	"betrebels" : "",
	"betway" : "betway.com",
	"bildbet" : "BildBet",
	"bwin" : "bwin",
	"campeonbet" : "Campeonbet",
	"ChillyBets" : "ChillyBets",
	"casinozer" : "Casinozer",
	"cbet" : "Cbet",
	"comeon" : "ComeOn!",
	"evobet" : "",
	"gwbet" : "",
	"happybet" : "HappyBet",
	"intertops" : "Intertops",
	"interwetten" : "Interwetten",
	"jaxx" : "Jaxx",
	"ladbrokes" : "LadBrokes",
	"leovegas" : "LeoVegas",
	"lsbet" : "LSBet",
	"mobilebet" : "Mobilebet",
	"mrgreen" : "MrGreen (AT)",
	"mybet" : "mybet.de",
	"netbet" : "Netbet (AT)",
	"pokerstars" : "",
	"rabona" : "",
	"reloadbet" : "ReloadBet",
	"sportingbet" : "Sportingbet",
	"sportwetten" : "Sportwetten.de",
	"sultanbet" : "",
	"svenbet" : "SvenBet",
	"tipbet" : "",
	"tipico" : "Tipico",
	"tipp3" : "tipp3 (AT)",
	"tipster" : "Tipster",
	"tipwin" : "TipWin",
	"tornadobet" : "",
	"twentybet" : "20Bet",
	"unibet" : "unibet.de (AT)",
	"wettarena" : "Wettarena",
	"william hill" : "WilliamHill (AT)",
	"winamax" : "Winamax",
	"wirwetten" : "",
	"xtip" : "XTIP",
	"yonibet" : "Yonibet",
}