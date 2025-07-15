package com.nftcar.alyra.web.rest;

import com.nftcar.alyra.repository.NFTLevelRepository;
import com.nftcar.alyra.service.NFTLevelService;
import com.nftcar.alyra.service.dto.NFTLevelDTO;
import com.nftcar.alyra.web.rest.errors.BadRequestAlertException;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.nftcar.alyra.domain.NFTLevel}.
 */
@RestController
@RequestMapping("/api")
public class NFTLevelResource {

    private final Logger log = LoggerFactory.getLogger(NFTLevelResource.class);

    private static final String ENTITY_NAME = "nFTLevel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NFTLevelService nFTLevelService;

    private final NFTLevelRepository nFTLevelRepository;

    public NFTLevelResource(NFTLevelService nFTLevelService, NFTLevelRepository nFTLevelRepository) {
        this.nFTLevelService = nFTLevelService;
        this.nFTLevelRepository = nFTLevelRepository;
    }

    /**
     * {@code POST  /nft-levels} : Create a new nFTLevel.
     *
     * @param nFTLevelDTO the nFTLevelDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nFTLevelDTO, or with status {@code 400 (Bad Request)} if the nFTLevel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nft-levels")
    public ResponseEntity<NFTLevelDTO> createNFTLevel(@Valid @RequestBody NFTLevelDTO nFTLevelDTO) throws URISyntaxException {
        log.debug("REST request to save NFTLevel : {}", nFTLevelDTO);
        if (nFTLevelDTO.getId() != null) {
            throw new BadRequestAlertException("A new nFTLevel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NFTLevelDTO result = nFTLevelService.save(nFTLevelDTO);
        return ResponseEntity
            .created(new URI("/api/nft-levels/" + result.getId()))
            .headers(createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    public static HttpHeaders createEntityCreationAlert(String applicationName, boolean enableTranslation, String entityName, String param) {
        String message = enableTranslation
            ? applicationName + "." + entityName + ".created"
            : "Un NFT  a été créé avec l'identifiant " + param;
        return createAlert(applicationName, message, param);
    }
    public static HttpHeaders createAlert(String applicationName, String message, String param) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-" + applicationName + "-alert", message);
        try {
            headers.add("X-" + applicationName + "-params", URLEncoder.encode(param, StandardCharsets.UTF_8.toString()));
        } catch (UnsupportedEncodingException e) {
        }
        return headers;
    }
    /**
     * {@code PUT  /nft-levels/:id} : Updates an existing nFTLevel.
     *
     * @param id the id of the nFTLevelDTO to save.
     * @param nFTLevelDTO the nFTLevelDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nFTLevelDTO,
     * or with status {@code 400 (Bad Request)} if the nFTLevelDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nFTLevelDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nft-levels/{id}")
    public ResponseEntity<NFTLevelDTO> updateNFTLevel(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody NFTLevelDTO nFTLevelDTO
    ) throws URISyntaxException {
        log.debug("REST request to update NFTLevel : {}, {}", id, nFTLevelDTO);
        if (nFTLevelDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, nFTLevelDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!nFTLevelRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        NFTLevelDTO result = nFTLevelService.save(nFTLevelDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, nFTLevelDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /nft-levels/:id} : Partial updates given fields of an existing nFTLevel, field will ignore if it is null
     *
     * @param id the id of the nFTLevelDTO to save.
     * @param nFTLevelDTO the nFTLevelDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nFTLevelDTO,
     * or with status {@code 400 (Bad Request)} if the nFTLevelDTO is not valid,
     * or with status {@code 404 (Not Found)} if the nFTLevelDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the nFTLevelDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/nft-levels/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<NFTLevelDTO> partialUpdateNFTLevel(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody NFTLevelDTO nFTLevelDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update NFTLevel partially : {}, {}", id, nFTLevelDTO);
        if (nFTLevelDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, nFTLevelDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!nFTLevelRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<NFTLevelDTO> result = nFTLevelService.partialUpdate(nFTLevelDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, nFTLevelDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /nft-levels} : get all the nFTLevels.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nFTLevels in body.
     */
    @GetMapping("/nft-levels")
    public List<NFTLevelDTO> getAllNFTLevels() {
        log.debug("REST request to get all NFTLevels");
        return nFTLevelService.findAll();
    }

    /**
     * {@code GET  /nft-levels/:id} : get the "id" nFTLevel.
     *
     * @param id the id of the nFTLevelDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nFTLevelDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nft-levels/{id}")
    public ResponseEntity<NFTLevelDTO> getNFTLevel(@PathVariable Long id) {
        log.debug("REST request to get NFTLevel : {}", id);
        Optional<NFTLevelDTO> nFTLevelDTO = nFTLevelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nFTLevelDTO);
    }

    /**
     * {@code DELETE  /nft-levels/:id} : delete the "id" nFTLevel.
     *
     * @param id the id of the nFTLevelDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nft-levels/{id}")
    public ResponseEntity<Void> deleteNFTLevel(@PathVariable Long id) {
        log.debug("REST request to delete NFTLevel : {}", id);
        nFTLevelService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
