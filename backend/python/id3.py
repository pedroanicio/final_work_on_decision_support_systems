import sys
import json
import pandas as pd
import sqlite3
import os
import random
from sklearn.tree import DecisionTreeClassifier

def conectar_bd():
    diretorio_script = os.path.dirname(os.path.abspath(__file__))
    caminho_bd = os.path.join(diretorio_script, '..', 'src', 'sintomas.db')
    return sqlite3.connect(caminho_bd)

def obter_sintomas(db):
    cursor = db.cursor()
    cursor.execute('SELECT nome FROM sintomas')
    return [row[0] for row in cursor.fetchall()]

def gerar_dados_treinamento(sintomas):
    """ Gera dados fictícios associando sintomas a doenças diferentes. """
    doencas_possiveis = ["Gripe", "Covid", "Dengue", "Resfriado", "Alergia"]
    dados_ficticios = []

    for _ in range(500):  # 500 exemplos de treino
        sintomas_paciente = {s: random.choice(["Leve", "Médio", "Forte", "Nenhum"]) for s in sintomas}
        doenca = random.choice(doencas_possiveis)
        linha = {**sintomas_paciente, "Doença": doenca}
        dados_ficticios.append(linha)

    return pd.DataFrame(dados_ficticios)

def treinar_modelo(df):
    df_encoded = pd.get_dummies(df.drop('Doença', axis=1))  # gerar colunas "dummies"
    X = df_encoded
    y = df['Doença']
    clf = DecisionTreeClassifier(max_depth=5, min_samples_split=3, min_samples_leaf=2, criterion='entropy')
    clf.fit(X, y)
    return clf, X.columns 

def prever_doenca(sintomas, clf, colunas_esperadas):
    """ Ajusta os sintomas recebidos para o formato esperado pelo modelo """
    sintomas_df = pd.DataFrame([{**{s: "Nenhum" for s in colunas_esperadas}, **sintomas}])

    
    sintomas_df = pd.get_dummies(sintomas_df)
    for col in colunas_esperadas:
        if col not in sintomas_df:
            sintomas_df[col] = 0  # se a coluna não existe, preenche com zero

    sintomas_df = sintomas_df[colunas_esperadas] 
    return clf.predict(sintomas_df)[0]

def main():
    try:
        sintomas_recebidos = json.loads(sys.argv[1])
    except (IndexError, json.JSONDecodeError):
        print("Erro: Sintomas inválidos.")
        sys.exit(1)

    db = conectar_bd()
    sintomas_disponiveis = obter_sintomas(db)
    db.close()

    if not sintomas_disponiveis:
        print("Erro: Nenhum sintoma cadastrado.")
        sys.exit(1)

    df = gerar_dados_treinamento(sintomas_disponiveis)
    clf, colunas_esperadas = treinar_modelo(df)

    diagnostico = prever_doenca(sintomas_recebidos, clf, colunas_esperadas)
    print(diagnostico)

if __name__ == "__main__":
    main()
