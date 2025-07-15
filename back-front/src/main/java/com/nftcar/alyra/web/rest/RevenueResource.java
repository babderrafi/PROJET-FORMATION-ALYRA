package com.nftcar.alyra.web.rest;

import com.nftcar.alyra.repository.RevenueRepository;
import com.nftcar.alyra.service.RevenueService;
import com.nftcar.alyra.service.dto.RevenueDTO;
import com.nftcar.alyra.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.nftcar.alyra.domain.Revenue}.
 */
@RestController
@RequestMapping("/api")
public class RevenueResource {

    private final Logger log = LoggerFactory.getLogger(RevenueResource.class);

    private static final String ENTITY_NAME = "revenue";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RevenueService revenueService;

    private final RevenueRepository revenueRepository;

    public RevenueResource(RevenueService revenueService, RevenueRepository revenueRepository) {
        this.revenueService = revenueService;
        this.revenueRepository = revenueRepository;
    }

    /**
     * {@code POST  /revenues} : Create a new revenue.
     *
     * @param revenueDTO the revenueDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new revenueDTO, or with status {@code 400 (Bad Request)} if the revenue has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/revenues")
    public ResponseEntity<RevenueDTO> createRevenue(@Valid @RequestBody RevenueDTO revenueDTO) throws URISyntaxException {
        log.debug("REST request to save Revenue : {}", revenueDTO);
        if (revenueDTO.getId() != null) {
            throw new BadRequestAlertException("A new revenue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RevenueDTO result = revenueService.save(revenueDTO);
        return ResponseEntity
            .created(new URI("/api/revenues/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /revenues/:id} : Updates an existing revenue.
     *
     * @param id the id of the revenueDTO to save.
     * @param revenueDTO the revenueDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated revenueDTO,
     * or with status {@code 400 (Bad Request)} if the revenueDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the revenueDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/revenues/{id}")
    public ResponseEntity<RevenueDTO> updateRevenue(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody RevenueDTO revenueDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Revenue : {}, {}", id, revenueDTO);
        if (revenueDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, revenueDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!revenueRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        RevenueDTO result = revenueService.save(revenueDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, revenueDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /revenues/:id} : Partial updates given fields of an existing revenue, field will ignore if it is null
     *
     * @param id the id of the revenueDTO to save.
     * @param revenueDTO the revenueDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated revenueDTO,
     * or with status {@code 400 (Bad Request)} if the revenueDTO is not valid,
     * or with status {@code 404 (Not Found)} if the revenueDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the revenueDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/revenues/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<RevenueDTO> partialUpdateRevenue(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody RevenueDTO revenueDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Revenue partially : {}, {}", id, revenueDTO);
        if (revenueDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, revenueDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!revenueRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<RevenueDTO> result = revenueService.partialUpdate(revenueDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, revenueDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /revenues} : get all the revenues.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of revenues in body.
     */
    @GetMapping("/revenues")
    public ResponseEntity<List<RevenueDTO>> getAllRevenues(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Revenues");
        Page<RevenueDTO> page = revenueService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /revenues/:id} : get the "id" revenue.
     *
     * @param id the id of the revenueDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the revenueDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/revenues/{id}")
    public ResponseEntity<RevenueDTO> getRevenue(@PathVariable Long id) {
        log.debug("REST request to get Revenue : {}", id);
        Optional<RevenueDTO> revenueDTO = revenueService.findOne(id);
        return ResponseUtil.wrapOrNotFound(revenueDTO);
    }

    /**
     * {@code DELETE  /revenues/:id} : delete the "id" revenue.
     *
     * @param id the id of the revenueDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/revenues/{id}")
    public ResponseEntity<Void> deleteRevenue(@PathVariable Long id) {
        log.debug("REST request to delete Revenue : {}", id);
        revenueService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
