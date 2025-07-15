package com.nftcar.alyra.service;

import com.nftcar.alyra.domain.RentalContract;
import com.nftcar.alyra.repository.RentalContractRepository;
import com.nftcar.alyra.service.dto.RentalContractDTO;
import com.nftcar.alyra.service.mapper.RentalContractMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link RentalContract}.
 */
@Service
@Transactional
public class RentalContractService {

    private final Logger log = LoggerFactory.getLogger(RentalContractService.class);

    private final RentalContractRepository rentalContractRepository;

    private final RentalContractMapper rentalContractMapper;

    public RentalContractService(RentalContractRepository rentalContractRepository, RentalContractMapper rentalContractMapper) {
        this.rentalContractRepository = rentalContractRepository;
        this.rentalContractMapper = rentalContractMapper;
    }

    /**
     * Save a rentalContract.
     *
     * @param rentalContractDTO the entity to save.
     * @return the persisted entity.
     */
    public RentalContractDTO save(RentalContractDTO rentalContractDTO) {
        log.debug("Request to save RentalContract : {}", rentalContractDTO);
        RentalContract rentalContract = rentalContractMapper.toEntity(rentalContractDTO);
        rentalContract = rentalContractRepository.save(rentalContract);
        return rentalContractMapper.toDto(rentalContract);
    }

    /**
     * Partially update a rentalContract.
     *
     * @param rentalContractDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<RentalContractDTO> partialUpdate(RentalContractDTO rentalContractDTO) {
        log.debug("Request to partially update RentalContract : {}", rentalContractDTO);

        return rentalContractRepository
            .findById(rentalContractDTO.getId())
            .map(existingRentalContract -> {
                rentalContractMapper.partialUpdate(existingRentalContract, rentalContractDTO);

                return existingRentalContract;
            })
            .map(rentalContractRepository::save)
            .map(rentalContractMapper::toDto);
    }

    /**
     * Get all the rentalContracts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    /*@Transactional(readOnly = true)
    public Page<RentalContractDTO> findAll(Pageable pageable) {
        log.debug("Request to get all RentalContracts");
        return rentalContractRepository.findAll(pageable).map(rentalContractMapper::toDto);
    }*/

    @Transactional(readOnly = true)
    public Page<RentalContractDTO> findAll(Pageable pageable) {
        log.debug("Request to get all RentalContracts with eager relationships");
        return rentalContractRepository
            .findAllWithEagerRelationships(pageable)
            .map(rentalContractMapper::toDto);
    }
    /**
     * Get one rentalContract by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<RentalContractDTO> findOne(Long id) {
        log.debug("Request to get RentalContract : {}", id);
        return rentalContractRepository.findById(id).map(rentalContractMapper::toDto);
    }

    /**
     * Delete the rentalContract by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete RentalContract : {}", id);
        rentalContractRepository.deleteById(id);
    }
}
