# -*- coding: utf-8 -*-
import json
import re
from datetime import datetime

class OraculoDaMateriaEscalavel:
    def __init__(self):
        self.contador_requisicoes = 0
        self.LIMITE_DIARIO = 1000000
        
        self.MATRIZ_CIENTIFICA = {
            "ferro": {"energia": 6.2, "agua": 42},
            "cobre": {"energia": 45.0, "agua": 125},
            "silicio": {"energia": 160.0, "agua": 2100}
        }
        self.lista_negra_seguranca = ["lote_eletronico_roubado_2026", "fornecedor_trabalho_ilegal"]

    def processar_busca(self, termo_busca, produto_do_banco=None, status_usuario="Gratuito", pais_usuario="BR"):
        self.contador_requisicoes += 1
        if self.contador_requisicoes > self.LIMITE_DIARIO:
            return {"erro": "Segurança: Limite diário atingido."}
            
        termo_chave = re.sub(r'[^a-zA-Z0-9_\\s]', '', termo_busca).strip().lower().replace(' ', '_')
        
        if not produto_do_banco:
            return {"status": 404, "mensagem": f"Item '{termo_busca}' na fila de mineração."}
            
        rastro = produto_do_banco.get("rastro_seguranca", "lote_regular_verificado")
        if rastro in self.lista_negra_seguranca:
            return self._disparar_alerta_orgaos(produto_do_banco["nome"], rastro)
                
        e_total = sum(produto_do_banco.get(f"composicao_{mat}_kg", 0) * dados["energia"] for mat, dados in self.MATRIZ_CIENTIFICA.items())
        a_total = sum(produto_do_banco.get(f"composicao_{mat}_kg", 0) * dados["agua"] for mat, dados in self.MATRIZ_CIENTIFICA.items())
        
        fator_cambio = 5.20 if pais_usuario == "BR" else 1.0
        simbolo_moeda = "R$" if pais_usuario == "BR" else "US$"
        valor_convertido = float(produto_do_banco["preco_base_usd"]) * fator_cambio
        
        dossie = {
            "dados_publicos": {
                "produto": produto_do_banco["nome"],
                "preco_local_ajustado": f"{simbolo_moeda} {valor_convertido:,.2f}",
                "sustentabilidade": {"energia_kwh": round(e_total, 2), "agua_litros": round(a_total, 2)},
                "cultura_pop_cinema": produto_do_banco.get("cultura_pop")
            }
        }
        
        if status_usuario == "Gratuito":
            dossie["trava_premium_profissional"] = {"status": "BLOQUEADO (🔒 BLUR VISUAL)"}
        else:
            dossie["camada_premium_desbloqueada"] = {
                "normas_tecnicas": produto_do_banco.get("normas_tecnicas"),
                "interop_medica": produto_do_banco.get("interop_medica")
            }
            
        return dossie

    def _disparar_alerta_orgaos(self, nome_prod, rastro_crime):
        return {
            "STATUS": "PRODUTO BLOQUEADO - ATIVIDADE ILÍCITA",
            "registro": {"objeto": nome_prod, "evidencia": rastro_crime, "timestamp": datetime.now().isoformat()}
        }
