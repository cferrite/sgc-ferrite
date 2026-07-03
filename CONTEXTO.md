# Contexto do Projeto — SGC Ferrite

> Documento vivo. Atualizar sempre que uma decisão importante for
> tomada, um módulo for iniciado/concluído, ou o escopo mudar.

## Visão geral

Sistema de gestão de imóveis e locações, nascido da necessidade real
de substituir um processo manual (Excel/Word) de emissão de borderôs.
Objetivo final: plataforma completa com apps para inquilinos e
administradores, controle financeiro robusto, e futuramente automações
(leitura de consumo por imagem, integração com automação predial).

## Metodologia de trabalho

- Pessoa iniciante em programação, aprendendo enquanto constrói.
- Ritmo: "pincelada" — código explicado por cima durante a construção,
  revisão linha a linha ao final de cada módulo concluído.
- Tudo digitado manualmente pela pessoa (Claude não gera arquivos prontos,
  apenas orienta comando a comando / conteúdo a conteúdo).
- Terminal usado para navegação e comandos (git, npm); VS Code usado
  para editar conteúdo de arquivos (`code nome-do-arquivo`).
- Antes de criar qualquer tabela nova, discutir necessidades reais de
  negócio primeiro — não usar estrutura genérica sem validar.

## Decisões técnicas já tomadas

- Node.js com módulos ES (`import`/`export`, `"type": "module"` no
  package.json).
- PostgreSQL, acessado com driver `pg` puro (sem ORM), para aprender SQL.
- `dotenv` para variáveis de ambiente (senha do banco fora do código).
- Regra de ouro do núcleo: código-base (`src/db/`) nunca depende de um
  módulo específico. Módulos dependem do núcleo, nunca o contrário.
- `.gitignore` cobre `node_modules/` e `.env`.

## Repositório

- GitHub: https://github.com/cferrite/sgc-ferrite.git
- Nome do projeto: sgc-ferrite

## Roadmap por fases

## Pesquisa de mercado (referência competitiva)

Levantamento feito em jul/2026 sobre players brasileiros (Kenlo,
Superlógica, Jetimob, QuintoAndar, Piloto Imóveis). Recursos que
aparecem como "padrão competitivo" no setor:

- Repasse automático via PIX ao proprietário, sem taxas extras
- Cobrança ativa por WhatsApp, com rastreamento de leitura/entrega
- Reajuste automático de contrato por índice (IGPM, INPC, IPCA)
- Contratos digitais com assinatura eletrônica
- Central de autoatendimento (proprietário e inquilino): 2ª via,
  recibos, histórico de pagamentos
  Contexto de mercado: crescimento de 45,4% em domicílios alugados no
  Brasil na última década (~17,8 milhões de imóveis alugados em 2024).

## Decisões de produto (registradas para não esquecer)

- Notificações: usar push notification (ex: Firebase) como base.
  WhatsApp Business API como evolução futura (alta taxa de abertura,
  padrão de mercado). Chat em tempo real dentro do app via WebSocket
  (mantém conexão aberta enquanto o app está em uso).
- Captação de leads (placa com QR Code): o QR Code abre uma PÁGINA WEB
  simples (sem exigir app instalado), com informações do imóvel. Se
  o visitante demonstrar interesse, um link disponibiliza o cadastro
  completo (que pode levar ao app). Evita fricção de exigir instalação
  antes de qualquer informação.
- Módulo de Leads/Interessados: cadastro público (sem login), vinculado
  a um imóvel específico via QR Code único por imóvel. Resultado cai
  numa lista/painel dentro do sistema (fase inicial); notificação
  automática (push/e-mail) é evolução futura.

### Fase 1 — Núcleo administrativo (EM ANDAMENTO)

- [ ] Cadastro de proprietários (pessoa física ou jurídica, dados bancários p/ repasse)
- [ ] Cadastro de imóveis (vinculado a proprietário; mobiliado ou não)
- [ ] Cadastro de inquilinos
- [ ] Contratos (liga imóvel + inquilino + proprietário)
- [ ] Vistorias (condição do imóvel, móveis, instalações — item a item)

### Fase 2 — Financeiro

- [ ] Fornecedores
- [ ] Contas a pagar / contas a receber
- [ ] Caixa e fluxo de caixa
- [ ] Controle de manutenção (gasto por unidade)
- [ ] Faturamento / Borderô (automatizar o que hoje é manual)
- [ ] DRE, relatórios por período, gráficos

### Fase 3 — Experiência do usuário (Apps)

- [ ] Cadastro de usuários (login) + níveis de acesso (admin, proprietário, inquilino)
- [ ] App do inquilino: histórico de faturas, contratos, avisos
- [ ] App do administrador: visão geral, gestão dos módulos acima
- [ ] Regulamento condominial (texto com validação/aceite pelo inquilino)

### Fase 4 — Avançado

- [ ] Leitura automática de relógio de luz via foto (visão computacional)
- [ ] Integração com automação predial (portões, controle de acesso físico)

## Glossário

- **Núcleo**: código-base do qual os módulos dependem, mas que não
  depende de nenhum módulo específico.
- **Pool de conexões**: conjunto de conexões reaproveitáveis com o banco.
- **Normalização**: organizar dados evitando repetição — ex: dados do
  proprietário ficam numa tabela própria, e o imóvel só guarda uma
  referência (id) a ele, em vez de repetir nome/telefone em cada imóvel.
- **Cadastro de pessoa vs. cadastro de usuário**: pessoa = quem ela é
  (nome, CPF); usuário = credencial de acesso ao sistema (login, nível
  de permissão). Uma pessoa pode existir sem ter usuário.

## Avisos importantes

- Contratos de locação e regulamento condominial têm peso jurídico —
  Claude ajuda a estruturar, mas recomenda-se revisão por advogado
  antes do uso real com terceiros.
- Automação predial (hardware) está fora do escopo de JS/PostgreSQL;
  exigirá pesquisa específica do equipamento quando chegar a hora.

## Próximo passo imediato

Fechar o desenho da tabela de proprietários (pessoa física/jurídica,
dados bancários) e seguir para a tabela de imóveis.
