package com.br.astra.projetoAstra.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class FluxogramaController {

    @Value("${huggingface.api.token}")
    private String huggingFaceToken;

    @PostMapping("/gerar-fluxograma")
    public ResponseEntity<?> gerarFluxograma(@RequestBody Map<String, String> request) {
        String tema = request.get("tema");
        if (tema == null || tema.isBlank()) {
            return ResponseEntity.badRequest().body("Tema vazio");
        }

        try {
            // Prompt otimizado para Mermaid.js
            String prompt = "Crie um fluxograma em Mermaid.js sobre '" + tema +
                    "'. Retorne apenas o código Mermaid, sem explicações. Exemplo:\n" +
                    "graph TD\n  A[Início] --> B[Próximo passo]\n  B --> C[Fim]";

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + huggingFaceToken);
            headers.setContentType(MediaType.APPLICATION_JSON);

            // JSON simples, apenas inputs
            String body = "{ \"inputs\": \"" + prompt.replace("\"", "\\\"").replace("\n"," ") + "\" }";
            HttpEntity<String> entity = new HttpEntity<>(body, headers);

            // Modelo de texto (GPT-style)
            String apiUrl = "https://router.huggingface.co/hf-inference/models/bigscience/bloomz-560m";
            ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, String.class);

            return ResponseEntity.ok(response.getBody());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao gerar fluxograma: " + e.getMessage());
        }
    }
}
