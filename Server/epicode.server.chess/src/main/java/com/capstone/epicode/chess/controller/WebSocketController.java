package com.capstone.epicode.chess.controller;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.capstone.epicode.chess.payload.PieceMove;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/move") // Percorso per ricevere i messaggi di spostamento
    public void handleMove(@Payload PieceMove pieceMove) {
        // Esegui le operazioni necessarie con l'oggetto PieceMove

        // Invia il messaggio all'utente specifico
        messagingTemplate.convertAndSendToUser(pieceMove.getRoom(), "/queue/private", pieceMove);
    }
}
