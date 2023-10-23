export class Dictionary {
    private dictionary: {[language: string]: {[word: string]: string} } = {};

    contructor(){
        this.dictionary['pt'] = {
            /**
             * COMUM A TODOS
             */
            ['rodada']:                     'Rodada',
            ['etapa']:                      'Etapa',
            ['poluicao_mundial']:           'Poluição Mundial',
            ['eleitos']:                    'Eleitos',
            ['terminar_etapa']:             'Terminar etapa',
            ['nome']:                       'Nome',
            ['cidade']:                     'Cidade',
            ['dinheiros']:                  'Dinheiros',
            ['ds']:                         'D$',
            ['produto']:                    'Produto',
            ['pessoa']:                     'Pessoa',
            //['finalizar_jogada']:           'Finalizar jogada',
            ['valores_produtos']:           'Valores de Produtos',
            ['semente']:                    'Semente',
            ['fertilizante']:               'Fertilizante',
            ['maquina']:                    'Máquina',
            ['agrotoxico']:                 'Agrotóxico',
            ['hortalica']:                  'Hortaliça',
            ['arroz']:                      'Arroz',
            ['soja']:                       'Soja',
            ['comum']:                      'Comum',
            ['premium']:                    'Premium',
            ['super premium']:              'Super Premium',
            ['maquinas 1']:                 'Pacote de Máquina 1',
            ['maquinas 2']:                 'Pacote de Máquina 2',
            ['maquinas 3']:                 'Pacote de Máquina 3',
            ['pulverizador']:               'Pulverizador',
            ['sim']:                        'Sim',
            ['nao']:                        'Não',
            ['nenhum']:                     'Nenhum',
            ['baixa']:                      'Baixa',
            ['media']:                      'Média',
            ['alta']:                       'Alta',
            ['marcar_todas']:               'Marcar todas',
            ['abrir_historico']:            'Abrir histórico',

            /**
             * TRANSFER
             */
            ['transferir_ds']:              'Transferir dinheiros',
            ['confirmar']:                  'Confirmar',

            /**
             * HOME
             */
            ['novo_jogo']:                  'Novo jogo',
            ['qntd_jogadores']:             'Quantidade de jogadores',
            ['pelo_menos']:                 'Pelo menos',
            ['comecar']:                    'Começar',
            ['ingressar']:                  'Ingressar em um jogo',
            ['id_jogo']:                    'ID do jogo',
            ['personagem']:                 'Personagem',
            ['entrar']:                     'Entrar',

            /**
             * MESTRE
             */
            ['mestre']:                     'Mestre',
            ['produtividade_mundial']:      'Produtividade Mundial',
            ['status_jogadores']:           'Status dos jogadores na etapa',
            ['terminou']:                   'Terminou',
            ['nao_terminou']:               'Não terminou',

            /**
             * EMPRESARIO
             */
            ['empresario']:                 'Empresario',
            ['orcamentos']:                 'Orçamentos',
            ['fazer_orcamento']:            'Fazer orçamento',
            ['cliente']:                    'Cliente',
            ['quantia']:                    'Quantia',
            ['preco']:                      'Preço',
            // TEXTS
            ['emp_text_sidebar']:           'Respostas dos Agricultores para os orçamentos',
            // INFOS
            ['emp_info_sidebar']:           'Ainda não há respostas',

            /**
             * AGRICULTOR
             */
            ['agricultor']:                 'Agricultor',
            ['parcela']:                    'Parcela',
            ['p_x']:                        'P', // usado na interface do fiscal para dar selo verde
            ['pedir_sv']:                   'Pedir Selo Verde',
            // TEXTS
            ['agr_text_sidebar']:           'Orçamentos enviados pelos Empresários',
            // INFO
            ['agr_info_sidebar']:           'Sem orçamentos. Faça um pedido a um Empresario',

            /**
             * FISCAL
             */
            ['fiscal']:                     'Fiscal Ambiental',
            ['acoes']:                      'Ações', // usado também no prefeito e no vereador
            ['multar']:                     'Multar',
            ['tipo_multa']:                 'Tipo de Multa',
            ['selo_verde']:                 'Selo Verde',
            ['atribuir']:                   'Atribuir',
            ['tirar']:                      'Tirar',
            // TEXTS
            ['fis_text_multa']:             'Multas a serem aplicadas no fim da jogada',
            ['fis_text_sv']:                'Selos verdes a serem processados no fim da jogada',
            ['fis_text_sidebar']:           'Agricultores que pediram Selo Verde',
            // INFO
            ['fis_info_multa']:             'Ainda não foram adicionadas multas',
            ['fis_info_sv']:                'Ainda não foram adicionados Selos Verdes',

            /**
             * PREFEITO
             */
            ['prefeito']:                   'Prefeito',
            ['usar_aa']:                    'Usar Ação Ambiental',
            ['mudar_taxa']:                 'Mudar taxa de imposto',
            ['agua']:                       'Água',
            ['lixo']:                       'Lixo',
            ['esgoto']:                     'Esgoto',
            ['tipo_taxa']:                  'Tipo',
            // TEXTS
            ['pref_text_aa']:               'Ações Ambientaisa serem aplicadas no fim da jogada',
            ['pref_text_taxa']:             'Taxas a serem mudadas no fim da jogada',
            ['pref_text_sidebar']:          'Sugestões do Vereador',
            // INFO
            ['pref_info_aa']:               'Ainda não foram adicionadas Ações Ambientais',
            ['pref_info_taxa']:             'Ainda não foram adicionadas mudanças de taxa',
            ['pref_info_sidebar']:          'Ainda não foram enviadas sugestões',

            /**
             * VEREADOR
             */
            ['vereador']:                   'Vereador',
            ['fazer_sugestao']:             'Fazer sugestão para o Prefeito',
            // TEXTS
            ['ver_text_sidebar']:           'Respostas do Prefeito para sugestões enviadas',
            // INFO
            ['ver_info_sidebar']:           'Ainda sem respostas'

            /**
             * ERROS E WARNINGS
             */
            
        };
        
        this.dictionary['en'] = {
            /**
             * COMUM A TODOS
             */
            ['rodada']:                     'Round',
            ['etapa']:                      'Stage',
            ['poluicao_mundial']:           'World Pollution',
            ['eleitos']:                    'Elected',
            ['terminar_etapa']:             'Finish stage',
            ['nome']:                       'Name',
            ['cidade']:                     'City',
            ['dinheiros']:                  'Moneys',
            ['ds']:                         'M$',
            ['produto']:                    'Product',
            ['pessoa']:                     'Person',
            //['finalizar_jogada']:           'Finalizar jogada',
            ['valores_produtos']:           'Product prices',
            ['semente']:                    'Seed',
            ['fertilizante']:               'Fertiliser',
            ['maquina']:                    'Machine',
            ['agrotoxico']:                 'Pesticide',
            ['hortalica']:                  'Vegetable',
            ['arroz']:                      'Rice',
            ['soja']:                       'Soy',
            ['comum']:                      'Common',
            ['premium']:                    'Premium',
            ['super premium']:              'Super Premium',
            ['maquinas 1']:                 'Machine Pack 1',
            ['maquinas 2']:                 'Machine Pack 2',
            ['maquinas 3']:                 'Machine Pack 3',
            ['pulverizador']:               'Sprayer',
            ['sim']:                        'Yes',
            ['nao']:                        'No',
            ['nenhum']:                     'None',
            ['baixa']:                      'Low',
            ['media']:                      'Medium',
            ['alta']:                       'High',
            ['marcar_todas']:               'Select all',
            ['abrir_historico']:            'Open history',

            /**
             * TRANSFER
             */
            ['transferir_ds']:              'Transfer Moneys',
            ['confirmar']:                  'Confirm',

            /**
             * HOME
             */
            ['novo_jogo']:                  'New game',
            ['qntd_jogadores']:             'Quantity of players',
            ['pelo_menos']:                 'At least',
            ['comecar']:                    'Start',
            ['ingressar']:                  'Join a game',
            ['id_jogo']:                    'Game ID',
            ['personagem']:                 'Character',
            ['entrar']:                     'Join',

            /**
             * MESTRE
             */
            ['mestre']:                     'Master',
            ['produtividade_mundial']:      'World productivity',
            ['status_jogadores']:           'Players\' status',
            ['terminou']:                   'Finished',
            ['nao_terminou']:               'Did not finish',

            /**
             * EMPRESARIO
             */
            ['empresario']:                 'Businessman',
            ['orcamentos']:                 'Budget',
            ['fazer_orcamento']:            'Make budget',
            ['cliente']:                    'Client',
            ['quantia']:                    'Amount',
            ['preco']:                      'Price',
            // TEXTS
            ['emp_text_sidebar']:           'Farmers responses for budgets',
            // INFOS
            ['emp_info_sidebar']:           'No responses yet',

            /**
             * AGRICULTOR
             */
            ['agricultor']:                 'Farmer',
            ['parcela']:                    'Land',
            ['p_x']:                        'L', // usado na interface do fiscal para dar selo verde
            ['pedir_sv']:                   'Ask for green seal',
            // TEXTS
            ['agr_text_sidebar']:           'Budgets sent by Businessmen',
            // INFO
            ['agr_info_sidebar']:           'No budgets yet. Request a budget for a businessman',

            /**
             * FISCAL
             */
            ['fiscal']:                     'Environmental Supervisor',
            ['acoes']:                      'Actions', // usado também no prefeito e no vereador
            ['multar']:                     'Fine',
            ['tipo_multa']:                 'Fine type',
            ['selo_verde']:                 'Green Seal',
            ['atribuir']:                   'Give',
            ['tirar']:                      'Take',
            // TEXTS
            ['fis_text_multa']:             'Fines to be processed in the end of the stage',
            ['fis_text_sv']:                'Green seals to be processed in the end of the stage',
            ['fis_text_sidebar']:           'Farmers who asked for green seals',
            // INFO
            ['fis_info_multa']:             'No fines added yet',
            ['fis_info_sv']:                'No green seals added yet',

            /**
             * PREFEITO
             */
            ['prefeito']:                   'Mayor',
            ['usar_aa']:                    'Use Environmental Action',
            ['mudar_taxa']:                 'Change Tax Rate',
            ['agua']:                       'Water',
            ['lixo']:                       'Garbage',
            ['esgoto']:                     'Sink',
            ['tipo_taxa']:                  'Type',
            // TEXTS
            ['pref_text_aa']:               'Environmental Actions to be processed in the end of the stage',
            ['pref_text_taxa']:             'Tax changes to be processed in the end of the stage',
            ['pref_text_sidebar']:          'City Alderman suggestions',
            // INFO
            ['pref_info_aa']:               'No environmental actions added yet',
            ['pref_info_taxa']:             'No tax changes added yet',
            ['pref_info_sidebar']:          'No suggestions received',

            /**
             * VEREADOR
             */
            ['vereador']:                   'City Alderman',
            ['fazer_sugestao']:             'Make suggestion to the Mayor',
            // TEXTS
            ['ver_text_sidebar']:           'Mayor responses for suggestions made',
            // INFO
            ['ver_info_sidebar']:           'No responses yet'
        }
    }
}