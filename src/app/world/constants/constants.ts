// WS Message Type
export const WSMT_CHAT = 'chat';
export const WSMT_GAME = 'game';

// EVENT CODES
export const EC_GAME_STATUS 		 	= 0;									// "message": {"status": GameStatus, "rodada": rodada, "etapa": etapa}
export const EC_PESSOA_COMECOU_JOGADA 	= EC_GAME_STATUS + 1;		            // "message": {"idPessoa": idPessoa, "nomePessoa": nomePessoa, "etapa": etapa}
export const EC_PESSOA_FINALIZOU_JOGADA = EC_PESSOA_COMECOU_JOGADA + 1;			// "message": {"idPessoa": idPessoa, "nomePessoa": nomePessoa, "etapa": etapa}
export const EC_ORCAMENTO 				= EC_PESSOA_FINALIZOU_JOGADA + 1;		// "message" : {} as Orcamento
export const EC_ORCAMENTO_RESPOSTA 	 	= EC_ORCAMENTO + 1;						// "message" : {} as Orcamento
export const EC_SUGESTAO  				= EC_ORCAMENTO_RESPOSTA + 1;			// "message" : {} as Sugestao
export const EC_SUGESTAO_RESPOSTA  	 	= EC_SUGESTAO + 1;						// "message" : {} as Sugestao

// Game Statuses
export const GS_INICIO_ETAPA  	 			 			= 0;
export const GS_TODOS_JOGADORES_NA_ETAPA  	 			= GS_INICIO_ETAPA + 1;
export const GS_JOGADORES_ACABARAM_ETAPA			  	= GS_TODOS_JOGADORES_NA_ETAPA + 1;
export const GS_MESTRE_TERMINOU_ETAPA  	 	 			= GS_JOGADORES_ACABARAM_ETAPA + 1;
export const GS_FIM_JOGO  	 	 			 			= GS_MESTRE_TERMINOU_ETAPA + 1;